import { BotTemplate } from "@prisma/client";
import { Shield, Hand, Music, Ticket, Coins, FileText, Smile, Target, Code } from "lucide-react";

export const BOT_TEMPLATES = [
  {
    id: BotTemplate.MODERATION,
    name: "Moderation Bot",
    description: "Keep your server safe with automated filters and ban commands.",
    icon: Shield,
  },
  {
    id: BotTemplate.WELCOME,
    name: "Welcome Bot",
    description: "Greet new members and assign default roles automatically.",
    icon: Hand,
  },
  {
    id: BotTemplate.MUSIC,
    name: "Music Bot",
    description: "Play high-quality music from YouTube, Spotify, and more.",
    icon: Music,
  },
  {
    id: BotTemplate.TICKET,
    name: "Ticket Bot",
    description: "Create private support channels for server members.",
    icon: Ticket,
  },
  {
    id: BotTemplate.ECONOMY,
    name: "Economy Bot",
    description: "Engage users with virtual currency, shops, and leaderboards.",
    icon: Coins,
  },
  {
    id: BotTemplate.LOGGING,
    name: "Logging Bot",
    description: "Track all message edits, deletions, and member updates.",
    icon: FileText,
  },
  {
    id: BotTemplate.REACTION_ROLES,
    name: "Reaction Roles",
    description: "Allow users to self-assign roles by reacting to messages.",
    icon: Smile,
  },
  {
    id: BotTemplate.LEVELING,
    name: "Leveling Bot",
    description: "Reward active members with XP and level-up roles.",
    icon: Target,
  },
  {
    id: BotTemplate.CUSTOM,
    name: "Custom Bot",
    description: "Start from scratch and build your own unique functionality.",
    icon: Code,
  },
];
