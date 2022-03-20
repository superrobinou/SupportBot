import errors from 'level-errors';
import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import { Discord, Slash } from 'discordx';
import { DB } from '../Main.js';
@Discord()
class ChannnelClose{
    @Slash('close')
    async execute(interaction: CommandInteraction<CacheType>) {
        var channel = interaction.channel;
        var test =false;
        if (channel.isText() && channel.type=="GUILD_TEXT") {
            var name:string;
            var error=false;
            var lastchannel:string;
            try {
                name = await DB.get('name');
            }
            catch (err) {
                if (err instanceof errors.NotFoundError) {
                    interaction.reply("vous ne pouvez pas fermer de salon car le bot n'a pas été configuré");
                    error=true;
                }
                else {
                    console.log(err);
                }
            }
            try {
                lastchannel = await DB.get('LastChannel');
            }
            catch (err) {
                if (err instanceof errors.NotFoundError && error==true) {
                    interaction.reply("vous ne pouvez pas fermer de salon car le bot n'a pas été configuré");
                }
                else {
                    console.log(err);
                }
            }
            if(error==true){
            for(var i=1;i++;i<=Number.parseInt(lastchannel)){

                var isOpen=await DB.get("channel"+i);
                if (channel.name==name+i && isOpen=='false'){
                    interaction.reply({
                        embeds: [new MessageEmbed().setTitle('Demande fermé').setDescription('Le salon a été correctement fermé')],
                    });
                    test=true;
                    channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });
                    DB.put("channel+i",true);
                }
            }
        }
     
        }
        if (test == false && error==false) { interaction.reply({ content: 'ce salon ne peut pas être fermé', ephemeral: true }); }
        return true;
    }
}
export default ChannnelClose;