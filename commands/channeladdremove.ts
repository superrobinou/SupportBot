

import { CacheType, CommandInteraction} from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import errors from 'level-errors';
import { DB } from '../Main.js';
@Discord()
 class ChannnelAddRemove{

    @Slash('cm')
    async execute(@SlashChoice("add","add") @SlashChoice("remove","remove") @SlashOption("state")state:string,@SlashOption("number",{type:"INTEGER",description:"number",minValue:1,required:true}) number:number,interaction:CommandInteraction<CacheType>) {
        var name:string='support';
        var lastchannel:number=1;
        try{
            name = await DB.get('name');
        }
        catch(err){
            if(err instanceof errors.NotFoundError){

            }
            else{
                console.log(err);
            }
        }
       try{
        lastchannel = await DB.get('LastChannel');
       }
       catch(err){
        if(err instanceof errors.NotFoundError){

        }
        else{
            console.log(err);
        }
       }
        var newLastchannel=0;
        console.log(state);
        if(state=="add"){
            newLastchannel = lastchannel + number;
            for (var i = lastchannel; i <= lastchannel + number; i++){
                await interaction.guild.channels.create(name+i, { type: 'GUILD_TEXT', reason: 'support needed' });
                DB.put('channel'+i,'true');
            }
            DB.put('LastChannel',newLastchannel);

        }
        else{
            newLastchannel = lastchannel - number;
            if(newLastchannel>0){
                for (var i = lastchannel; i <= lastchannel + number;i--) {
                    const channel=interaction.guild.channels.cache.find(r=>r.name===name+i);
                    channel.delete();
                    DB.del('channel'+i);
                }
                DB.put('LastChannel', newLastchannel);
            }

        }
        interaction.reply('channel crée/supprimé!');
        return true;
    }
}

export default ChannnelAddRemove;