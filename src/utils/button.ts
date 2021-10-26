import {
  EmojiIdentifierResolvable,
  MessageButton,
  MessageButtonStyleResolvable,
} from "discord.js";

interface IGetButton {
  style: MessageButtonStyleResolvable;
  emoji: EmojiIdentifierResolvable;
  label: string;
  customId: string;
}

export const getButton = (props: IGetButton): MessageButton => {
  return new MessageButton()
    .setStyle(props.style)
    .setEmoji(props.emoji)
    .setLabel(props.label)
    .setCustomId(props.customId);
};
