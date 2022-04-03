import { CacheType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import {RootModel,Root} from '../models/root.js';
//commande pour changer le nom du channel
@Discord()
class ChannnelName{
    @Slash('channelname')
   async execute(@SlashOption('nom',{type:'STRING',description:'nom',required:true}) nom:string,interaction: CommandInteraction<CacheType>) {
       //vérification des permissions de l'utilisateur
       if(interaction.memberPermissions.has('MANAGE_CHANNELS')){
                   //récupération des données par rapport au serveur d'ou est lancé la commande
        var root=await RootModel.findOne({guildId:interaction.guild.id});
        //création du serveur s'il n'existe pas dans la base de données (c'est donc la commande à lancer en premier)
        if(root==null){
            var r=new Root();
            r.guildId=interaction.guild.id;
            r.lastChannel=0;
            r.nom=nom;
            RootModel.create(r);
    
        }
        else{
            //sinon, changement de nom
         root.nom=nom;
         root.save();
        }
        interaction.reply('nom du channel changé');
        return true;
    }
       else {
           interaction.reply({content:"vous n'avez pas la permission d'utiliser cette commande",ephemeral:true});
       }
}

};
export default ChannnelName;