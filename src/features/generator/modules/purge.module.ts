import { BotModule } from "../types/generator.types";

export const PurgeModule: BotModule = {
  metadata: {
    id: "purge",
    name: "Purge",
    category: "Moderation",
    premium: false,
    dependencies: ["logging"],
    requiredPackages: {},
  },
  commands: [
    {
      path: "commands/moderation/purge.ts",
      content: `import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Deletes a specific number of messages")
    .addIntegerOption(option => 
      option.setName("amount")
        .setDescription("Number of messages to delete (1-100)")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getInteger("amount");
    
    if (!amount || !(interaction.channel instanceof TextChannel)) {
      return interaction.reply({ content: "This command can only be used in text channels.", ephemeral: true });
    }

    try {
      const deleted = await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({ content: \`Successfully deleted \${deleted.size} messages.\`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Failed to delete messages. I might be missing permissions or the messages are older than 14 days.", ephemeral: true });
    }
  }
};`,
    },
  ],
};
