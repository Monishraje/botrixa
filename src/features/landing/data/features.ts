import { Bot, Wand2, LayoutTemplate, Download, FolderTree, Code2 } from "lucide-react";
import { FeatureData } from "../types";

export const landingFeatures: FeatureData[] = [
  {
    title: "AI Bot Generation",
    description:
      "Describe your bot's functionality and let our AI generate the core logic instantly.",
    icon: Bot,
    status: "Available",
  },
  {
    title: "Visual Builder",
    description:
      "Drag and drop commands, events, and responses without writing a single line of code.",
    icon: Wand2,
    status: "Coming Soon",
  },
  {
    title: "Templates",
    description: "Start from production-ready templates for moderation, music, and ticket systems.",
    icon: LayoutTemplate,
    status: "Beta",
  },
  {
    title: "One-click Download",
    description: "Export your generated project instantly and deploy it anywhere you want.",
    icon: Download,
    status: "Available",
  },
  {
    title: "Clean Project Structure",
    description: "Every generated bot follows strict, scalable architecture guidelines.",
    icon: FolderTree,
    status: "Available",
  },
  {
    title: "Open Source Friendly",
    description: "No vendor lock-in. The code is yours to modify, expand, and host indefinitely.",
    icon: Code2,
    status: "Available",
  },
];
