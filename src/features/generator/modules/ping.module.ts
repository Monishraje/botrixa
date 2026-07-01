import { BotModule } from "../types/generator.types";

export const PingModule: BotModule = {
  metadata: {
    id: "ping",
    name: "Ping",
    category: "Utility",
    premium: false,
    dependencies: [],
    requiredPackages: {},
  },
  commands: [
    {
      path: "commands/utility/ping.ts",
      content: `import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: "Pong!", ephemeral: true });
  }
};`,
    },
  ],
};
