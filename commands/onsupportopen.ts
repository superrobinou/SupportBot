import { ButtonInteraction } from "discord.js";
import { ButtonComponent, Discord } from "discordx";
import { DB } from "../Main.js";

@Discord()
class OnSupportOpen{
@ButtonComponent('panel')
 async Button(interaction:ButtonInteraction){
     var channels=await this.checkOpenChannel();
     if(channels.length!=0){
        interaction.reply('regardez vos dm');
        var test=await interaction.user.send('1');
        var setup=await test.awaitMessageComponent({time:1500});
        var test2=await setup.user.send('2');
        var descriptionProbleme=await test2.awaitMessageComponent({time:1500});
        var channels=await this.checkOpenChannel();
        if(channels.length!=0){
            var channel=channels[0];
            var name=await DB.get('name');
            var ch=interaction.guild.channels.cache.find(c=>c.name==name+channel);
            if(ch.isText() && ch.type=="GUILD_TEXT"){
                ch.permissionOverwrites.edit(ch.guild.roles.everyone,{SEND_MESSAGES:true});
                ch.send('lol');
            }
        }else{
        descriptionProbleme.user.send("aucun salon de support n'est libre");
        }
     }
     else{
        interaction.reply("aucun salon de support n'est libre"); 
     }
console.log(interaction);
    
}
async checkOpenChannel(): Promise<Number[]> {
    var lastchannel = await DB.get('LastChannel');
    var openChannels = [];
    for (var i = 1; i++; i <= lastchannel) {
        var channel = await DB.get('channel' + i);
        if (channel === 'true') {
            openChannels.push(i);
        }
    }
    return openChannels;
}
}
export default OnSupportOpen;