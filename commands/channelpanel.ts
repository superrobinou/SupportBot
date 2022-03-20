
import { CacheType, Channel, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
@Discord()
class ChannnelPanel{
    @Slash('channelpanel')
    async execute(@SlashOption('channel', { type: 'CHANNEL', description: 'channel', required: true }) channel:Channel,interaction: CommandInteraction<CacheType>) {
        var c=interaction.guild.channels.cache.get(channel.id);
        if(c.isText()){
            c.send({
                embeds:[new MessageEmbed().setColor('GREY').setTitle('support').setDescription('Votre demande de support')],
                components: [new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('panel').setLabel('Support').setStyle('PRIMARY')
                )]})
        }
        interaction.reply('panel crée!');
        return true;
    }
};
export default ChannnelPanel;