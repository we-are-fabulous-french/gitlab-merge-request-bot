import { MessageEmbedOptions } from "discord.js";
import { messageRepo } from "../../router/messageCreate";

const KEYWORD = "rename";

// First Step
messageRepo.addAction({
  filter: `${KEYWORD}`,
  callback: async (message) => {
    await message.mentions.members?.map((m) => {
      const n = message.content
        .split(" ")
        .filter((f) => !f.startsWith("<@") && f !== KEYWORD)
        .join(" ");
      m.setNickname(n);
    });
    await message.delete();
  },
});

export const help: MessageEmbedOptions = {
  title: "Rename peoples",
  description: "",
  footer: {
    text: `${KEYWORD} [@tag] /pseudal/`,
  },
};
