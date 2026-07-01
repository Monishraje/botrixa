import { BotModule } from "../types/generator.types";

export const WarnModule: BotModule = {
  metadata: {
    id: "warn",
    name: "Warn",
    category: "Moderation",
    premium: false,
    dependencies: ["logging"],
    requiredPackages: {},
  },
  commands: [
    {
      path: "commands/moderation/warn.ts",
      content: `import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warns a user")
    .addUserOption(option => 
      option.setName("target")
        .setDescription("The user to warn")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for the warning")
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason");
    
    if (!target || !interaction.guild || !reason) {
      return interaction.reply({ content: "Invalid arguments provided.", ephemeral: true });
    }

    try {
      await target.send(\`You have been warned in \${interaction.guild.name} for: \${reason}\`).catch(() => null);
      await interaction.reply({ content: \`Successfully warned \${target.tag} for: \${reason}\` });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Failed to warn the user.", ephemeral: true });
    }
  }
};`,
    },
  ],
};
