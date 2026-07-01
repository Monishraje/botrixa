import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { GeneratorService } from "@/features/generator/services/generator.service";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;
  const { searchParams } = new URL(req.url);
  const modulesString = searchParams.get("modules") || "";
  const template = searchParams.get("template") || "custom";

  const modules = modulesString ? modulesString.split(",") : [];

  try {
    const { zipBuffer, bot } = await GeneratorService.generate(
      id,
      template,
      modules,
      session.user.id
    );

    return new NextResponse(new Blob([new Uint8Array(zipBuffer)]), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${bot.slug}-export.zip"`,
      },
    });
  } catch (error) {
    console.error("Failed to generate bot:", error);
    return new NextResponse("Failed to generate bot", { status: 500 });
  }
}
