import { ButtonInteraction, Message } from "discord.js";

type TActionButton = {
  id: string;
  callback: (button: ButtonInteraction) => void;
};

class ClickButtonRepo {
  private actions: TActionButton[];
  constructor() {
    this.actions = [];
  }

  /**
   * addAction
   */
  public addAction(act: TActionButton) {
    this.actions.push(act);
  }

  public exec(button: ButtonInteraction) {
    const actionToRun = this.actions.filter((a) => button.customId === a.id);
    actionToRun.forEach((a) => a.callback(button));
  }
}

export const clickButtonRepo = new ClickButtonRepo();
