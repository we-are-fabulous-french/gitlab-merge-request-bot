import { Event, BaseEvent } from 'ioc:factory/Core/Event'
import { Message } from 'discord.js'

@Event('messageCreate')
export default class MessageCreateEvent extends BaseEvent {
  public async run (message: Message): Promise<void> {
    // Your code here
  }
}