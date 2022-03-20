import { CacheType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { DB } from '../Main.js';
@Discord()
class ChannnelName{
    @Slash('channelname')
   async execute(@SlashOption('nom',{type:'STRING',description:'nom',required:true}) nom:string,interaction: CommandInteraction<CacheType>) {
       console.log(DB);
        DB.put('name',nom);
        interaction.reply('nom du channel changé');
        return true;
    }
};
export default ChannnelName;