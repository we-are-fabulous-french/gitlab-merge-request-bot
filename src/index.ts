import "module-alias/register";
import { Logger } from "./infrastructure/logger";
import {
  ButtonInteraction,
  Client,
  Intents,
  Message,
  MessageButton,
} from "discord.js";
import "./use-cases";
import { messageRepo } from "./router/messageCreate";
import { clickButtonRepo } from "./router/clickButton";

export const discord = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});

discord.on("ready", () => {
  Logger.info("Bot is ready");
});

discord.on("messageCreate", async (message: Message) => {
  messageRepo.exec(message);
});

discord.on("interactionCreate", async (interaction: any) => {
  if (!interaction.isButton()) return;
  clickButtonRepo.exec(interaction as ButtonInteraction);
});

discord.login(process.env.APP_TOKEN);
