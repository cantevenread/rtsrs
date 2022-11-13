// deno-lint-ignore-file
import Embeds from 'https://deno.land/x/discordeno@17.0.0/packages/embeds/mod.ts';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts';
import { rdomcolor } from '../Rtsrs.Utils/colors.ts';
import { createCommand, day, timenow } from './mod.ts';

// await CreateTable('Slavery').then(() => {
//   const log = logger({ name: 'DB Manager' });
//   log.info('Made new Table');
// });
// const slavery = new KwikTable(kwik, 'Slavery');

createCommand({
  name: 'userinfo',
  description: 'userinfo',
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.User,
      name: 'user',
      description: 'mention user',
      required: true,
    },
  ],
  execute: async (Bot, interaction) => {
    if (interaction?.data?.resolved?.users === undefined) return;
    if (interaction?.guildId === undefined) return;
    if (interaction?.data?.options === undefined) return;

    const msg = JSON.stringify(
      Object.fromEntries(interaction.data.resolved.users),
      (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    );

    const embed = new Embeds()
      .setTitle('rtsrs user info')
      .setTimestamp(timenow.getTime())
      .setColor(rdomcolor())
      .setDescription(`${msg}`)
      .setFooter(`rtsrs bot`);

    const user = interaction.user.id;
    const guildid: bigint = interaction.guildId;
    const resolveduser = interaction.data?.options[0].value?.toString()!;
    console.log(resolveduser);

    // if ((await dbHasValue(user.toString(), slavery)) === false) {
    //   await setdbValue(user.toString(), slavery, user);
    // }

    // await Bot.helpers.editMember(guildid, resolveduser, {
    //   communicationDisabledUntil: Date.now() + 600000
    // });

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds: embed,
        },
      }
    );
  },
});
