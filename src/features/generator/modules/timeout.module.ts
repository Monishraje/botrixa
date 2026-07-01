import { BotModule } from "../types/generator.types";

export const TimeoutModule: BotModule = {
  metadata: {
    id: "timeout",
    name: "Timeout",
    category: "Moderation",
    premium: false,
    dependencies: ["logging"],
    requiredPackages: {},
  },
  commands: [
    {
      path: "commands/moderation/timeout.ts",
      content: `import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeouts a user in the server")
    .addUserOption(option => 
      option.setName("target")
        .setDescription("The user to timeout")
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName("duration")
        .setDescription("Duration in minutes")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for the timeout")
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target");
    const duration = interaction.options.getInteger("duration");
    const reason = interaction.options.getString("reason") ?? "No reason provided";
    
    if (!target || !interaction.guild || !duration) {
      return interaction.reply({ content: "Invalid arguments provided.", ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(target.id);
      await member.timeout(duration * 60 * 1000, reason);
      await interaction.reply({ content: \`Successfully timed out \${target.tag} for \${duration} minutes. Reason: \${reason}\` });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Failed to timeout the user. I might be missing permissions.", ephemeral: true });
    }
  }
};`,
    },
  ],
};
