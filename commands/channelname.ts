import { CacheType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { Model } from '../models/models.js';
@Discord()
class ChannnelName{
    @Slash('channelname')
   async execute(@SlashOption('nom',{type:'STRING',description:'nom',required:true}) nom:string,interaction: CommandInteraction<CacheType>) {
        const model:Model=new Model();
        model.putName(nom);
        interaction.reply('nom du channel changé');
        return true;
    }
};
export default ChannnelName;