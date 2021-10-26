import { MessageActionRow, MessageButton } from "discord.js";

export const getRow = (buttons: MessageButton[]): MessageActionRow => {
  const row = new MessageActionRow();
  buttons.forEach((b) => row.addComponents(b));
  return row;
};
