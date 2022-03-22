
import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import { Discord, Slash } from 'discordx';
import { Model } from '../models/models.js';
@Discord()
class ChannnelClose{
    @Slash('close')
    async execute(interaction: CommandInteraction<CacheType>) {
        var channel = interaction.channel;
        const model=new Model();
        if (channel.isText() && channel.type=="GUILD_TEXT") {
            var name:string=await model.getName(false,interaction);
            var lastchannel:number=await model.getLastChannel(true,interaction);
            if(lastchannel!=-1){
           model.toggleChannel(lastchannel,channel,name,interaction,1);
        }
        }
     
    }
}
export default ChannnelClose;