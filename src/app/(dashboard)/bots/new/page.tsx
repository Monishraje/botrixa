import { getProjectsAction } from "@/features/bots/actions/projects.actions";
import { BotCreationFlow } from "@/features/bots/components/bot-creation-flow";

export const metadata = {
  title: "Create Bot | Botrixa",
};

export default async function NewBotPage() {
  // Fetch up to 100 projects to populate the select dropdown for Bot creation
  const response = await getProjectsAction({ page: 1, limit: 100, sort: "desc" });
  const projects = response.success ? response.data.items : [];

  return <BotCreationFlow projects={projects} />;
}
