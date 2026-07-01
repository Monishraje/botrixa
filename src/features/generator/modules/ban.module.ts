import { BotModule } from "../types/generator.types";

export const BanModule: BotModule = {
  metadata: {
    id: "ban",
    name: "Ban",
    category: "Moderation",
    premium: false,
    dependencies: ["logging"],
    requiredPackages: {},
  },
  commands: [
    {
      path: "commands/moderation/ban.ts",
      content: `import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user from the server")
    .addUserOption(option => 
      option.setName("target")
        .setDescription("The user to ban")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for the ban")
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") ?? "No reason provided";
    
    if (!target) {
      return interaction.reply({ content: "User not found.", ephemeral: true });
    }
    
    if (!interaction.guild) {
      return interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
    }

    try {
      await interaction.guild.members.ban(target, { reason });
      await interaction.reply({ content: \`Successfully banned \${target.tag} for: \${reason}\` });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Failed to ban the user. I might be missing permissions.", ephemeral: true });
    }
  }
};`,
    },
  ],
};
