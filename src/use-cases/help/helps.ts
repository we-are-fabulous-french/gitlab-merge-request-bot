import { MessageEmbedOptions } from "discord.js";

import { help as helpMergeRequest } from "../merge-request/index.process";
import { help as helpNickname } from "../nickname/index.process";

export const help: MessageEmbedOptions = {
  title: "To display help of all commands use",
  description: "",
  color: "DARK_ORANGE",
  footer: {
    text: `${"help"}`,
  },
};

export const helps = [help, helpMergeRequest, helpNickname];
