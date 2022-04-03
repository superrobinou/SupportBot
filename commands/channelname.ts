import { CacheType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import {RootModel,Root} from '../models/root.js';
@Discord()
class ChannnelName{
    @Slash('channelname')
   async execute(@SlashOption('nom',{type:'STRING',description:'nom',required:true}) nom:string,interaction: CommandInteraction<CacheType>) {
       if(interaction.memberPermissions.has('MANAGE_CHANNELS')){
        var root=await RootModel.findOne({guildId:interaction.guild.id});
        console.log(root);
        if(root==null){
            var r=new Root();
            r.guildId=interaction.guild.id;
            r.lastChannel=0;
            r.nom=nom;
            RootModel.create(r);
    
        }
        else{
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