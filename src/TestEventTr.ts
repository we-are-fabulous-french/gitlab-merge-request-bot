import { Event, BaseEvent } from "ioc:factory/Core/Event";
import {
  CommandInteraction,
  Message,
  MessageActionRow,
  MessageButton,
} from "discord.js";

@Event("messageCreate")
export default class TestEventTr extends BaseEvent {
  public async run(message: Message): Promise<void> {
    if (message.content.includes("toto")) {
      console.log("WOUHOU");
      console.log(message);
      const button = new MessageButton()
        .setStyle("SUCCESS")
        .setEmoji("✔")
        .setLabel("Success")
        .setCustomId("unique-button-id");

      const row = new MessageActionRow().addComponents(button);

      message.reply({ content: "I send my buttons", components: [row] });
    }
  }
}
