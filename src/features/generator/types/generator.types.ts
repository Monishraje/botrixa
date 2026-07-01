export interface ModuleMetadata {
  id: string;
  name: string;
  category: string;
  premium: boolean;
  dependencies: string[];
  requiredPackages: Record<string, string>;
}

export interface GeneratedFileContent {
  path: string;
  content: string;
}

export interface BotModule {
  metadata: ModuleMetadata;
  commands?: GeneratedFileContent[];
  events?: GeneratedFileContent[];
  services?: GeneratedFileContent[];
  utils?: GeneratedFileContent[];
  env?: Record<string, string>; // Key-Value pairs for .env
}
