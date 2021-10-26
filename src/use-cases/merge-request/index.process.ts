import { MessageEmbed } from "discord.js";
import { Logger } from "src/infrastructure/logger";
import { clickButtonRepo } from "src/router/clickButton";
import { messageRepo } from "src/router/messageCreate";
import { getButton } from "src/utils/button";
import { getRow } from "src/utils/row";
import { getUrlInString } from "src/utils/url";

const CustomIds = {
  READ: "btn-Read",
  APPROUVE: "btn-Approuve",
  COMMENTED: "btn-Commented",
  FIXED: "btn-Fixed",
  MERGED: "btn-Merged",
};

// First Step
messageRepo.addAction({
  filter: "-/merge_requests/",
  callback: async (message) => {
    const channel = message.channel;
    const url = getUrlInString(message.content);
    if (!url) return;

    const embed = new MessageEmbed();
    embed.setAuthor("Merge Request");
    embed.setURL(url);
    embed.setTitle(url);
    embed.setDescription(`by: <@${message.author.id}>`);
    embed.setThumbnail(
      "https://cdn.icon-icons.com/icons2/2415/PNG/512/gitlab_original_logo_icon_146503.png"
    );

    const readButton = getButton({
      style: "SUCCESS",
      label: "Relecture",
      emoji: "🥶",
      customId: CustomIds.READ,
    });
    const component = getRow([readButton]);

    const botMessage = await channel.send({
      embeds: [embed],
      components: [component],
    });
    message.delete();

    const reviewersTag =
      message.mentions.members?.map((member) => `<@${member.id}>`).join(" ") ??
      "aucun";

    if (reviewersTag === "aucun") return;

    embed.setDescription(
      `by: <@${message.author.id}>\nrelecteurs: ${reviewersTag}`
    );
    botMessage.edit({
      content: `${reviewersTag}`,
      embeds: [embed],
    });
  },
});

// Second/Fourth Step

clickButtonRepo.addAction({
  id: CustomIds.READ,
  callback: (button) => {
    const approuveButton = getButton({
      style: "SUCCESS",
      emoji: "👍",
      label: "Approuvée",
      customId: CustomIds.APPROUVE,
    });
    const commentedButton = getButton({
      style: "SECONDARY",
      emoji: "😱",
      label: "Commentée",
      customId: CustomIds.COMMENTED,
    });
    const row = getRow([approuveButton, commentedButton]);

    button.update({ components: [row] });
  },
});

/**
 * Third Step
 */

clickButtonRepo.addAction({
  id: CustomIds.COMMENTED,
  callback: (button) => {
    const fixButton = getButton({
      style: "PRIMARY",
      emoji: "👍",
      label: "Corrigée",
      customId: CustomIds.READ,
    });
    const row = getRow([fixButton]);
    button.update({ components: [row] });
  },
});

/**
 * Pré-final Step
 */

clickButtonRepo.addAction({
  id: CustomIds.APPROUVE,
  callback: (button) => {
    const fixButton = getButton({
      style: "SUCCESS",
      emoji: "👌",
      label: "Mergée",
      customId: CustomIds.MERGED,
    });
    const row = getRow([fixButton]);
    button.update({ components: [row] });
  },
});

/**
 * Final Step
 */
clickButtonRepo.addAction({
  id: CustomIds.MERGED,
  callback: (button) => {
    button.update({ components: [] });
  },
});

// function getUserFromMention(mention) {
// 	if (!mention) return;

// 	if (mention.startsWith('<@') && mention.endsWith('>')) {
// 		mention = mention.slice(2, -1);

// 		if (mention.startsWith('!')) {
// 			mention = mention.slice(1);
// 		}

// 		return client.users.cache.get(mention);
// 	}
// }
