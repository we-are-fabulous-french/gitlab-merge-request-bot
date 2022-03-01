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
  disabled?: boolean;
}

export const getButton = (props: IGetButton): MessageButton => {
  const btn = new MessageButton()
    .setStyle(props.style)
    .setEmoji(props.emoji)
    .setLabel(props.label)
    .setCustomId(props.customId);

  if (props.disabled) {
    btn.setDisabled(true);
  }
  return btn;
};
