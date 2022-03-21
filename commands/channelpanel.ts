
import { ButtonInteraction, CacheType, Channel, CommandInteraction, Message, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { ButtonComponent, Discord, Slash, SlashOption } from 'discordx';
import { Model } from '../models/models.js';
@Discord()
class ChannnelPanel{
    async checkOpenChannel(): Promise<Number[]> {
        var model=new Model();
        var lastchannel = await model.getLastChannel(false,null);
        var openChannels = [];
        if(lastchannel!=-1){
            for (var i = 1; i <= lastchannel;i++) {
                var channel = await model.getIsOpen(false,i,null);
                if (channel === true) {
                    openChannels.push(i);
                }
        }
      
        }
        return openChannels;
    }
    @Slash('channelpanel')
    async execute(@SlashOption('channel', { type: 'CHANNEL', description: 'channel', required: true }) channel:Channel,interaction: CommandInteraction<CacheType>) {
        var model:Model=new Model();
        var messageId:Message=await model.getMessageId();
        if(messageId!=null){
            await messageId.delete();
        }
            const panel = new MessageButton().setCustomId('panel').setLabel('Support').setStyle('PRIMARY');
            const row = new MessageActionRow().addComponents(panel);

            var c = interaction.guild.channels.cache.get(channel.id);

            if (c.isText()) {
                c.send({
                    embeds: [new MessageEmbed().setColor('GREY').setTitle('support').setDescription('Votre demande de support')],
                    components: [row]
                })
            }
            await interaction.reply({ content: 'panel crée', ephemeral: true });
            const message=await interaction.fetchReply();
            model.putMessageId(message);

     
    }
    @ButtonComponent('panel')
    async Button(interaction: ButtonInteraction) {
        const model=new Model();
        var channels = await this.checkOpenChannel();
        if (channels.length != 0) {
            interaction.reply('regardez vos dm');
            var test = await interaction.user.send('1');
            var setup = await test.awaitMessageComponent({ time: 1500 });
            var test2 = await setup.user.send('2');
            var descriptionProbleme = await test2.awaitMessageComponent({ time: 1500 });
            var channels = await this.checkOpenChannel();
            if (channels.length != 0) {
                var channel = channels[0];
                var name = await model.getName(false,null);
                var ch = interaction.guild.channels.cache.find(c => c.name == name + channel);
                if (ch.isText() && ch.type == "GUILD_TEXT") {
                    ch.permissionOverwrites.edit(ch.guild.roles.everyone, { SEND_MESSAGES: true });
                    ch.send('lol');
                }
            } else {
                descriptionProbleme.user.send("aucun salon de support n'est libre");
            }
        }
        else {
            interaction.reply("aucun salon de support n'est libre");
        }

    }
   
}

export default ChannnelPanel;