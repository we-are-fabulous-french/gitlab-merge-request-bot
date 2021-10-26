import { Message } from "discord.js";

type TAction = {
  filter: string;
  callback: (message: Message) => void;
};

class MessageRepo {
  private actions: TAction[];
  constructor() {
    this.actions = [];
  }

  /**
   * addAction
   */
  public addAction(act: TAction) {
    this.actions.push(act);
  }

  public exec(message: Message) {
    const actionToRun = this.actions.filter((a) =>
      message.content.includes(a.filter)
    );
    actionToRun.forEach((a) => a.callback(message));
  }
}

export const messageRepo = new MessageRepo();
