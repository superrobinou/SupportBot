

import { CacheType, CommandInteraction} from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { Model } from '../models/models.js';
@Discord()
 class ChannnelAddRemove{

    @Slash('cm')
    async execute(@SlashChoice("add","add") @SlashChoice("remove","remove") @SlashOption("state")state:string,@SlashOption("number",{type:"INTEGER",description:"number",minValue:1,required:true}) number:number,interaction:CommandInteraction<CacheType>) {
        const model:Model=new Model();
        var libre=await model.getLibre();
        console.log("libre"+libre);
        var occupe =await model.getOccupe();
        if (libre==""){
            var test=await interaction.guild.channels.create('libre',{type:'GUILD_CATEGORY',reason:'libre'});
            console.log(test);
            libre=test.id;
        }
        model.putLibre(libre);
        if(occupe==""){
            var test2 = await interaction.guild.channels.create('occupé', { type: 'GUILD_CATEGORY', reason: 'occupé' });
            occupe=test2.id;
        }
        model.PutOccupe(occupe);
        var name:string=await model.getName(false,interaction);
            var lastchannel: number = await model.getLastChannel(false,interaction);
            var newLastchannel = 0;
            console.log(state);
            if (state == "add") {
                newLastchannel = lastchannel + number-1;
                for (var i = lastchannel; i <= newLastchannel; i++) {
                    await interaction.guild.channels.create(name + i, { type: 'GUILD_TEXT', reason: 'support needed', permissionOverwrites: 
                    [{id:interaction.guild.roles.everyone,deny:['SEND_MESSAGES']}],parent:libre });
                   model.putChannel(i);
                }
                console.log(newLastchannel);
                model.putLastChannel(newLastchannel);

            }
            else {
                newLastchannel = lastchannel - number-1;
                if (newLastchannel > 0) {
                    for (var i = newLastchannel; i <= lastchannel; i--) {
                        const channel = interaction.guild.channels.cache.find(r => r.name === name + i);
                        channel.delete();
                        model.deleteChannel(i);
                    }
                    model.putLastChannel(newLastchannel);

            }
        }
        interaction.reply('channel crée/supprimé!');
    }
}

export default ChannnelAddRemove;