

import { CacheType, CommandInteraction} from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { ChannelSupport } from '../models/channel';
import { RootModel } from '../models/root';
@Discord()
 class ChannnelAddRemove{

    @Slash('cm')
    async execute(@SlashChoice("add","add") @SlashChoice("remove","remove") @SlashOption("state")state:string,@SlashOption("number",{type:"INTEGER",description:"number",minValue:1,required:true}) number:number,interaction:CommandInteraction<CacheType>) {
        if (interaction.memberPermissions.has('MANAGE_CHANNELS')) {
        var root = await RootModel.findOne({ guildId: interaction.guild.id });
        console.log(root);
        var libre= root.categoryLibre;
        var occupe =root.categoryOccupe;
        if (libre==undefined){
            var test=await interaction.guild.channels.create('libre',{type:'GUILD_CATEGORY',reason:'libre'});
            console.log(test);
            libre=test.id;
            root.categoryLibre=libre;
        }
        if(occupe==undefined){
            var test2 = await interaction.guild.channels.create('occupé', { type: 'GUILD_CATEGORY', reason: 'occupé' });
            occupe=test2.id;
            root.categoryOccupe=occupe;
        }
        var nom=root.nom;
        console.log(libre);
        console.log(occupe);
            var lastchannel: number = root.lastChannel;
            var newLastchannel = 0;
            console.log(state);
            if (state == "add") {
                newLastchannel = lastchannel + number-1;
                for (var i = lastchannel; i <= newLastchannel; i++) {
                    var ch=await interaction.guild.channels.create(nom + i, { type: 'GUILD_TEXT', reason: 'support needed', permissionOverwrites: 
                    [{id:interaction.guild.roles.everyone,deny:['SEND_MESSAGES']}],parent:libre });
                   root.channels.push(new ChannelSupport(ch.id));
                }
                console.log(newLastchannel);
                root.lastChannel=newLastchannel+1;
                root.save();

            }
            else {
                newLastchannel = lastchannel - number-1;
                if (newLastchannel > 0) {
                    for (var i = newLastchannel; i <= lastchannel; i--) {
                        const channel = interaction.guild.channels.cache.find(r => r.name === nom + i);
                        root.channels = root.channels.filter((el)=>{return el.channelId!=channel.id});
                        channel.delete();

                    }
                    root.lastChannel=newLastchannel+1;
                    root.save();

            }
               
        }
        interaction.reply({content:'channel crée/supprimé!',ephemeral:true});
    }
        else {
            interaction.reply({ content: "vous n'avez pas la permission d'utiliser cette commande", ephemeral: true });
        }
    }
}

export default ChannnelAddRemove;