import { AvailableModules } from "../modules";
import { BotModule } from "../types/generator.types";

export class ModuleBuilder {
  /**
   * Resolves a list of module IDs, pulling in their dependencies recursively.
   */
  static resolveDependencies(selectedModuleIds: string[]): BotModule[] {
    const resolvedIds = new Set<string>();

    const resolve = (id: string) => {
      if (resolvedIds.has(id)) return;
      const botModule = AvailableModules[id];
      if (!botModule) {
        throw new Error(`Module ${id} not found.`);
      }

      // Resolve dependencies first
      if (botModule.metadata.dependencies) {
        for (const dep of botModule.metadata.dependencies) {
          resolve(dep);
        }
      }

      resolvedIds.add(id);
    };

    for (const id of selectedModuleIds) {
      resolve(id);
    }

    return Array.from(resolvedIds).map((id) => AvailableModules[id]);
  }
}
