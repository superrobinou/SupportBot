
import { ButtonInteraction, CacheType, Channel, CommandInteraction, GuildMember, Message, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { ButtonComponent, Discord, Slash, SlashOption } from 'discordx';
import { ModelSupport, ChannelSupport } from '../models/channel.js';
import { Root, RootModel } from '../models/root.js';

@Discord()
class ChannnelPanel{
    async checkOpenChannel(root:Root) :Promise<ChannelSupport>{
        var channels=root.channels;
        return channels.find(ch=>{return ch.isOpen==true});
    }
    @Slash('channelpanel')
    async execute(@SlashOption('channel', { type: 'CHANNEL', description: 'channel', required: true }) channel:Channel,interaction: CommandInteraction<CacheType>) {
        if(interaction.memberPermissions.has('MANAGE_MESSAGES')){
        var root = await RootModel.findOne({ root: interaction.guild.id });
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
            root.buttonId=message.id;
            root.save();
        }
        else{
            interaction.reply({content:"vous n'avez pas la permission d'utiliser cette commande",ephemeral:true});
        }
     
    }
    @ButtonComponent('panel')
    async Button(interaction: ButtonInteraction) {
        var root = await RootModel.findOne({ root: interaction.guild.id });
        var channel = await this.checkOpenChannel(root);
        var roleMember = interaction.member.roles;
        var test="";
        if (Array.isArray(roleMember)){
            var test=roleMember.find((el)=>{el==root.roleDemandeur || el==root.roleSupport});
        }
        else{
            var test=roleMember.cache.find((el)=>{return el.id==root.roleDemandeur || el.id==root.roleSupport}).id;
        }
        if (channel!=null && test!=null) {

            interaction.reply({content:'regardez vos dm',ephemeral:true});
            var dmChannel =await interaction.user.createDM();
            await dmChannel.send('décrivez la configuration de vos machines si cela est en lien avec votre probléme');
            var setup = (await dmChannel.awaitMessages({ filter: (m => m.author.id == interaction.user.id), max: 1})).first();
            await setup.reply('décrivez votre problême');
            var descriptionProbleme = (await dmChannel.awaitMessages({ filter: (m => m.author.id == interaction.user.id), max: 1})).first();
            var channel = await this.checkOpenChannel(root);
            if (channel != null) {
                var name = "";
                var ch = interaction.guild.channels.cache.find(c => c.id == channel.channelId);
                if (ch.isText() && ch.type == "GUILD_TEXT") {
                    ch.permissionOverwrites.edit(ch.guild.roles.everyone, { SEND_MESSAGES: true });
                    ch.setParent(root.categoryOccupe);
                    var embed=new MessageEmbed().setColor('DARK_BLUE').setTitle('support demandé').setDescription('support demandé par '+'<@'+interaction.user+">")
                    .addField('setup',setup.content).addField('probléme',descriptionProbleme.content);
                    ch.send({embeds:[embed]});
                }
            } else {
                interaction.user.send({content:"aucun salon de support n'est libre"});
            }
        }
        else {
            interaction.reply({content:"aucun salon de support n'est libre", ephemeral: true});
        }

    }
   
}

export default ChannnelPanel;