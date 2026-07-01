import { prisma } from "@/lib/prisma";
import { ModuleBuilder } from "../builders/module-builder";
import { FileBuilder } from "../builders/file-builder";
import { ZipService } from "./zip.service";
import { GenerationStatus, FileType } from "@prisma/client";

export class GeneratorService {
  static async generate(botId: string, templateUsed: string, moduleIds: string[], userId: string) {
    const bot = await prisma.bot.findUnique({
      where: { id: botId, project: { userId } },
      include: { versions: { orderBy: { version: "desc" }, take: 1 } },
    });

    if (!bot) throw new Error("Bot not found or unauthorized.");

    const newVersionNum = bot.versions.length > 0 ? bot.versions[0].version + 1 : 1;

    const botVersion = await prisma.botVersion.create({
      data: {
        botId,
        version: newVersionNum,
        generatorVersion: "v0.6.0",
        templateUsed,
        modulesUsed: moduleIds,
        status: GenerationStatus.BUILDING,
      },
    });

    try {
      const resolvedModules = ModuleBuilder.resolveDependencies(moduleIds);

      const generatedFiles = FileBuilder.buildFiles(resolvedModules, {
        botName: bot.name,
        prefix: bot.prefix,
        generatorVersion: "v0.6.0",
        templateUsed,
      });

      const dbFiles = generatedFiles.map((f) => ({
        botVersionId: botVersion.id,
        path: f.path,
        content: f.content,
        type: this.getFileType(f.path),
      }));

      await prisma.generatedFile.createMany({ data: dbFiles });

      const zipBuffer = await ZipService.createZip(generatedFiles);

      await prisma.botVersion.update({
        where: { id: botVersion.id },
        data: { status: GenerationStatus.COMPLETE },
      });

      await prisma.generationLog.create({
        data: {
          botVersionId: botVersion.id,
          message: `Successfully generated bot version ${newVersionNum} with ${generatedFiles.length} files.`,
          level: "INFO",
        },
      });

      return { zipBuffer, botVersion, bot };
    } catch (error) {
      await prisma.botVersion.update({
        where: { id: botVersion.id },
        data: { status: GenerationStatus.FAILED },
      });
      await prisma.generationLog.create({
        data: {
          botVersionId: botVersion.id,
          message: error instanceof Error ? error.message : "Unknown error during generation.",
          level: "ERROR",
        },
      });
      throw error;
    }
  }

  private static getFileType(path: string): FileType {
    if (path.endsWith(".ts") || path.endsWith(".js")) return FileType.SOURCE;
    if (path.includes("config") || path.endsWith(".json")) return FileType.CONFIG;
    if (path.includes(".env")) return FileType.ENV;
    if (path.includes("Dockerfile") || path.includes("railway")) return FileType.DOCKER;
    if (path.includes("README")) return FileType.README;
    return FileType.SOURCE;
  }
}
