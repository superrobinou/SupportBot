
import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import { Discord, Slash } from 'discordx';
import { RootModel } from '../models/root';
//commande pour fermer un ticket
@Discord()
class ChannnelClose{
    @Slash('close')
    async execute(interaction: CommandInteraction<CacheType>) {
                //récupération des données par rapport au serveur d'ou est lancé la commande
        var root = await RootModel.findOne({ guildId: interaction.guild.id });
        //récupération du channel ou a été lancé la commande
        var channel = interaction.channel;
        //vérification du channel pour vérifier si c'est bien un channel textuel
        if (channel.isText() && channel.type=="GUILD_TEXT") {
            //récupération des channels étant utilisé par le support du serveur
            var channels=root.channels;
            //Recherche du channel pour vérifier que la commande peut-être exécuté dans ce channel
            var ch = channels.find((chi) => chi.channelId == channel.id);
            //si c'est le bon channel
            if(ch!=null){
                //verifications des permissions de l'utilisateur de la commande
                var roleMember = interaction.member.roles;
                var test="";
                if (Array.isArray(roleMember)) {
                    var test = roleMember.find((el) => { el == root.roleDemandeur || el == root.roleSupport });
                }
                else {
                    var test = roleMember.cache.find((el) => { return el.id == root.roleDemandeur || el.id == root.roleSupport }).id;
                }
                //si le channel peu être fermé, fermeture du ticket et enregistrement du statut du channel dans la base de donnée, le channel est maintenant libre.
                if(ch.isOpen==false && (ch.demandeur==interaction.user.id || test!=null)){
                    interaction.reply({
                        embeds: [new MessageEmbed().setTitle('Demande fermé').setDescription('Le salon a été correctement fermé')],
                    });
                    channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });
                    channel.setParent(root.categoryLibre);
                    ch.isOpen=true;
                    var index = root.channels.indexOf(ch);
                    root.channels[index]=ch;
                    root.save();
                }
                else { interaction.reply({content:"La demande ne peut être fermé puisqu'elle l'est déja",ephemeral:true}); }
            }else{
                interaction.reply({content:"Ce channel ne peut contenir aucune demande",ephemeral:true});
            }

        }
            
    }
}
export default ChannnelClose;