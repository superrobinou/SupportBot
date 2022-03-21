

import { CacheType, CommandInteraction} from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { Model } from '../models/models.js';
@Discord()
 class ChannnelAddRemove{

    @Slash('cm')
    async execute(@SlashChoice("add","add") @SlashChoice("remove","remove") @SlashOption("state")state:string,@SlashOption("number",{type:"INTEGER",description:"number",minValue:1,required:true}) number:number,interaction:CommandInteraction<CacheType>) {
        const model:Model=new Model();
        var libre=await model.getLibre();
        var occupe =await model.getOccupe();
        if (libre==""){
            var test=await interaction.guild.channels.create('occupé',{type:'GUILD_CATEGORY',reason:'libre'});
            libre=test.parentId;
        }
        model.putLibre(libre);
        if(occupe==""){
            var test2 = await interaction.guild.channels.create('occupé', { type: 'GUILD_CATEGORY', reason: 'occupé' });
            occupe=test2.parentId;
        }
        model.PutOccupe(occupe);
        var name:string=await model.getName(false,interaction);
            var lastchannel: number = await model.getLastChannel(false,interaction);
            var newLastchannel = 0;
            console.log(state);
            if (state == "add") {
                newLastchannel = lastchannel + number;
                for (var i = lastchannel; i <= lastchannel + number; i++) {
                    await interaction.guild.channels.create(name + i, { type: 'GUILD_TEXT', reason: 'support needed', permissionOverwrites: 
                    [{id:interaction.guild.roles.everyone,deny:['SEND_MESSAGES']}],parent:libre });
                   model.putChannel(i);
                }
                model.putLastChannel(newLastchannel);

            }
            else {
                newLastchannel = lastchannel - number;
                if (newLastchannel > 0) {
                    for (var i = lastchannel; i <= lastchannel + number; i--) {
                        const channel = interaction.guild.channels.cache.find(r => r.name === name + i);
                        channel.delete();
                        model.deleteChannel(i);
                    }
                    model.putLastChannel(newLastchannel);

            }
            interaction.reply('channel crée/supprimé!');
            return true;
        }
     
    }
}

export default ChannnelAddRemove;