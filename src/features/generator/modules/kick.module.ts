import { BotModule } from "../types/generator.types";

export const KickModule: BotModule = {
  metadata: {
    id: "kick",
    name: "Kick",
    category: "Moderation",
    premium: false,
    dependencies: ["logging"],
    requiredPackages: {},
  },
  commands: [
    {
      path: "commands/moderation/kick.ts",
      content: `import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user from the server")
    .addUserOption(option => 
      option.setName("target")
        .setDescription("The user to kick")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for the kick")
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") ?? "No reason provided";
    
    if (!target || !interaction.guild) {
      return interaction.reply({ content: "Command must be run in a guild with a valid target.", ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(target.id);
      await member.kick(reason);
      await interaction.reply({ content: \`Successfully kicked \${target.tag} for: \${reason}\` });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Failed to kick the user. I might be missing permissions or they have a higher role.", ephemeral: true });
    }
  }
};`,
    },
  ],
};
