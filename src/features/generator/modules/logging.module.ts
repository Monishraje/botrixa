import { BotModule } from "../types/generator.types";

export const LoggingModule: BotModule = {
  metadata: {
    id: "logging",
    name: "Logging System",
    category: "Server",
    premium: false,
    dependencies: [],
    requiredPackages: {},
  },
  events: [
    {
      path: "events/messageDelete.ts",
      content: `import { Events, Message, TextChannel, EmbedBuilder } from "discord.js";
import { config } from "../config";

export default {
  name: Events.MessageDelete,
  once: false,
  async execute(message: Message) {
    if (message.author?.bot) return;
    if (!config.LOG_CHANNEL_ID) return;
    
    const channel = message.guild?.channels.cache.get(config.LOG_CHANNEL_ID);
    if (channel && channel instanceof TextChannel) {
      const embed = new EmbedBuilder()
        .setTitle("Message Deleted")
        .setColor("Red")
        .addFields(
          { name: "Author", value: message.author?.tag || "Unknown" },
          { name: "Channel", value: \`<#\${message.channel.id}>\` },
          { name: "Content", value: message.content || "No text content" }
        )
        .setTimestamp();
        
      await channel.send({ embeds: [embed] }).catch(console.error);
    }
  }
};`,
    },
  ],
  env: {
    LOG_CHANNEL_ID: "YOUR_LOG_CHANNEL_ID_HERE",
  },
};
