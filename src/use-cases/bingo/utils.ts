import {
  ButtonInteraction,
  MessageButton,
  MessageButtonStyleResolvable,
  MessageEmbed,
} from "discord.js";
import { getButton } from "src/utils/button";

export const NO = "";
export const STRING_SEPARATOR = " => ";
export const EMOJI_YES = "🔳";
export const EMOJI_NO = "⬜️";
export const ID_SEPARATOR = "-";

export interface IPosition {
  x: number;
  y: number;
}

const parsePosition = (id: string): IPosition => ({
  x: parseInt(id.split(ID_SEPARATOR)[2].split(".")[0]),
  y: parseInt(id.split(ID_SEPARATOR)[2].split(".")[1]),
});

const parseIndex = (button: ButtonInteraction, position: IPosition) => {
  if (button.message.components) {
    const line = button.message.components[position.x];
    const action = line.components[position.y] as MessageButton;
    return parseInt(action.label ?? "");
  }
  return NaN;
};

export const parseItemsInCode = (content: string): string[] =>
  content.split("```\n")[1].replace("\n```", NO).split("\n");

const updateItem =
  (status: string, index: number) => (item: string, i: number) => {
    if (i === index - 1) {
      if (status === "1")
        return `${EMOJI_YES} ${i + 1} => ~~${
          item.split(STRING_SEPARATOR)[1]
        }~~`;
      return `${EMOJI_NO} ${i + 1} => ${item
        .split(STRING_SEPARATOR)[1]
        .replaceAll("~~", NO)}`;
    } else {
      return item;
    }
  };

export const generateMessage = (items: string[]): MessageEmbed[] => {
  const embed = new MessageEmbed();
  embed.setTitle("Bingo Christo");
  embed.setFooter(`modifiedAt: ${new Date().toDateString()}`);
  embed.setDescription(items.join("\n") ?? "");
  embed.setColor("#2F3136");
  return [embed];
};

export const updateButtonByStatus =
  (KEYWORD: string, status: string, style: MessageButtonStyleResolvable) =>
  async (button: ButtonInteraction) => {
    if (!button.message.components) return;

    const id = button.customId;
    const items = button.message.embeds[0].description?.split("\n");
    const position = parsePosition(id);
    const index = parseIndex(button, position);

    const updatedItems = items?.map(updateItem(status, index));

    const embed = new MessageEmbed();
    embed.setDescription(updatedItems?.join("\n") ?? "");

    const lineToUpdate = button.message.components[position.x];
    const buttonToUpdate = lineToUpdate.components[position.y] as MessageButton;
    const newComponents = button.message.components;

    newComponents[position.x].components[position.y] = getButton({
      customId: `${KEYWORD}-${status}-${position.x}.${position.y}`,
      style,
      emoji: "",
      label: buttonToUpdate.label ?? "",
    });

    await button.update({
      embeds: generateMessage(updatedItems ?? []),
      // @ts-ignore
      components: newComponents,
      fetchReply: true,
    });
  };
