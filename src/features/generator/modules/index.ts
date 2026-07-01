import { BanModule } from "./ban.module";
import { KickModule } from "./kick.module";
import { WarnModule } from "./warn.module";
import { TimeoutModule } from "./timeout.module";
import { PurgeModule } from "./purge.module";
import { WelcomeModule } from "./welcome.module";
import { LoggingModule } from "./logging.module";
import { PingModule } from "./ping.module";
import { BotModule } from "../types/generator.types";

export const AvailableModules: Record<string, BotModule> = {
  ban: BanModule,
  kick: KickModule,
  warn: WarnModule,
  timeout: TimeoutModule,
  purge: PurgeModule,
  welcome: WelcomeModule,
  logging: LoggingModule,
  ping: PingModule,
};
