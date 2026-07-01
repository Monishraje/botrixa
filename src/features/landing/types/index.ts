import { LucideIcon } from "lucide-react";

export type FeatureStatus = "Available" | "Beta" | "Coming Soon";

export interface FeatureData {
  title: string;
  description: string;
  icon: LucideIcon;
  status: FeatureStatus;
}

export interface FaqData {
  question: string;
  answer: string;
}

export interface TemplateData {
  title: string;
  description: string;
  status: "Coming Soon";
}
