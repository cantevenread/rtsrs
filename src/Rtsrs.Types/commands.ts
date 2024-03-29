import {
  ApplicationCommandOption,
  ApplicationCommandTypes,
  Interaction,
} from '../../deps.ts';
import { BotClient } from '../../rtsrs.ts';

export interface Command {
  /** The name of this command. */
  name: string;
  /** What does this command do? */
  description: string;
  /** The type of command this is. */
  type: ApplicationCommandTypes;
  /** Whether this command is for the dev server only. */
  devOnly?: boolean;
  /** The options for this command */
  options?: ApplicationCommandOption[];

  /** The cooldown for this command in seconds */
  cooldown?: number;
  /** This will be executed when the command is run. */
  execute: (bot: BotClient, interaction: Interaction) => unknown;
}
