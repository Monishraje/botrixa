import { BotModule } from "../types/generator.types";

export const WelcomeModule: BotModule = {
  metadata: {
    id: "welcome",
    name: "Welcome Messages",
    category: "Server",
    premium: false,
    dependencies: [],
    requiredPackages: {},
  },
  events: [
    {
      path: "events/guildMemberAdd.ts",
      content: `import { Events, GuildMember, TextChannel } from "discord.js";
import { config } from "../config";

export default {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member: GuildMember) {
    if (!config.WELCOME_CHANNEL_ID) return;
    
    const channel = member.guild.channels.cache.get(config.WELCOME_CHANNEL_ID);
    if (channel && channel instanceof TextChannel) {
      await channel.send(\`Welcome to the server, \${member.user.tag}!\`).catch(console.error);
    }
  }
};`,
    },
  ],
  env: {
    WELCOME_CHANNEL_ID: "YOUR_WELCOME_CHANNEL_ID_HERE",
  },
};
