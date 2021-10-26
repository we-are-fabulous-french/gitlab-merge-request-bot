import { MessageActionRow, MessageButton } from "discord.js";
import { clickButtonRepo } from "../../../src/router/clickButton";
import { messageRepo } from "../../router/messageCreate";

messageRepo.addAction({
  filter: "!toto",
  callback: (message) => {
    const button = new MessageButton()
      .setStyle("PRIMARY")
      .setEmoji("❤️")
      .setLabel("Du love")
      .setCustomId("toto-button-id");

    const row = new MessageActionRow().addComponents(button);

    message.reply({ content: "coucou", components: [row] });
  },
});

clickButtonRepo.addAction({
  id: "toto-button-id",
  callback: (button) => {
    const btn = new MessageButton()
      .setStyle("PRIMARY")
      .setEmoji("😁")
      .setLabel("Skye")
      .setCustomId("toto-btn-lolo");
    const row = new MessageActionRow().addComponents(btn);
    button.update({ components: [row] });
  },
});

clickButtonRepo.addAction({
  id: "toto-btn-lolo",
  callback: (button) => {
    const btn = new MessageButton()
      .setStyle("PRIMARY")
      .setEmoji("🤪")
      .setLabel("Finish")
      .setCustomId("toto-btn-lala");
    const btn2 = new MessageButton()
      .setStyle("DANGER")
      .setEmoji("🧐")
      .setLabel("Finish2")
      .setCustomId("toto-button-id");
    const row = new MessageActionRow().addComponents(btn);
    row.addComponents(btn2);
    button.update({ components: [row] });
  },
});
