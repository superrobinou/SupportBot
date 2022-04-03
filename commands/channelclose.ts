
import { CacheType, CommandInteraction, GuildMemberRoleManager, MessageEmbed } from 'discord.js';
import { Discord, Slash } from 'discordx';
import { RootModel } from '../models/root';
@Discord()
class ChannnelClose{
    @Slash('close')
    async execute(interaction: CommandInteraction<CacheType>) {
        var root = await RootModel.findOne({ root: interaction.guild.id });
        var channel = interaction.channel;
        if (channel.isText() && channel.type=="GUILD_TEXT") {
            var channels=root.channels;
            var ch = channels.find((chi) => chi.channelId == channel.id);
            if(ch!=null){
                var roleMember = interaction.member.roles;
                var test="";
                if (Array.isArray(roleMember)) {
                    var test = roleMember.find((el) => { el == root.roleDemandeur || el == root.roleSupport });
                }
                else {
                    var test = roleMember.cache.find((el) => { return el.id == root.roleDemandeur || el.id == root.roleSupport }).id;
                }
                if(ch.isOpen && (ch.demandeur==interaction.user.id || test!=null)){
                    interaction.reply({
                        embeds: [new MessageEmbed().setTitle('Demande fermé').setDescription('Le salon a été correctement fermé')],
                    });''
                    channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });
                    channel.setParent(root.categoryLibre);
                }
                else { interaction.reply({content:"La demande ne peut être fermé puisqu'elle l'est déja",ephemeral:true}); }
            }else{
                interaction.reply({content:"Ce channel ne peut contenir aucune demande",ephemeral:true});
            }

        }
            
    }
}
export default ChannnelClose;