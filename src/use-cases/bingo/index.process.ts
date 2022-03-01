import { MessageEmbed, MessageEmbedOptions } from "discord.js";
import { Logger } from "src/infrastructure/logger";
import { clickButtonRepo } from "../../router/clickButton";
import { messageRepo } from "../../router/messageCreate";
import { getButton } from "../../utils/button";
import { getRow } from "../../utils/row";
import {
  generateMessage,
  parseItemsInCode,
  updateButtonByStatus,
} from "./utils";

const KEYWORD = "bingo";
const MAX_ITEMS = 25;

messageRepo.addAction({
  filter: `!${KEYWORD}`,
  callback: async (message) => {
    const channel = message.channel;

    const items = parseItemsInCode(message.content);

    if (items.length > MAX_ITEMS) {
      await channel.send({
        content: `Maximum de ${MAX_ITEMS} choix pour le bingo 🦄`,
      });
    } else {
      const lineWidth = Math.round(Math.sqrt(items.length));

      const widthArray = new Array(lineWidth).fill(null);
      const heightArray = new Array(Math.ceil(items.length / lineWidth)).fill(
        null
      );

      // Generate buttons for the first time
      let index = 0;
      const buttonsComponent = heightArray.map((l, i) => {
        return getRow(
          widthArray.map((c, j) => {
            index++;
            if (index <= items.length) {
              return getButton({
                label: index.toString(),
                customId: `${KEYWORD}-0-${i}.${j}`,
                style: "SECONDARY",
                emoji: "",
              });
            }
            return getButton({
              label: " ",
              customId: `${Math.random()}.disabled`,
              style: "SECONDARY",
              emoji: "",
              disabled: true,
            });
          })
        );
      });

      await channel.send({
        embeds: generateMessage(items.map((c, i) => `⬜️ ${i + 1} => ${c}`)),
        components: buttonsComponent,
      });

      message.delete();
    }
  },
});

clickButtonRepo.addAction({
  id: `${KEYWORD}-0`,
  callback: updateButtonByStatus(KEYWORD, "1", "SUCCESS"),
});

clickButtonRepo.addAction({
  id: `${KEYWORD}-1`,
  callback: updateButtonByStatus(KEYWORD, "0", "SECONDARY"),
});

export const help: MessageEmbedOptions = {
  title: "Bingo Christo",
  description: `Create a Bingo UI for meetings
Example:
!bingo
\`\`\`
Element1
Element2
... (One Element per line)
\`\`\`
  `,
  color: "#ae2012",
  footer: {
    text: `!${KEYWORD}`,
  },
};
