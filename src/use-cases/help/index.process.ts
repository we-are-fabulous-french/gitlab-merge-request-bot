import { MessageEmbed } from "discord.js";
import { messageRepo } from "../../router/messageCreate";
import { helps } from "./helps";

const KEYWORD = "help";

messageRepo.addAction({
  filter: `${KEYWORD}`,
  callback: async (message) => {
    console.log(helps);
    await message.channel.send({
      embeds: helps.map((h) => new MessageEmbed(h)),
    });
    await message.delete();
  },
});
