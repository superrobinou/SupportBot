
import errors from 'level-errors';
import { CacheType, CommandInteraction,MessageEmbed, TextChannel } from "discord.js";
import level from "level";

export class Model{
    async getOccupe() {
        var test="";
        try{
            test=await Model.DB.get('occupe');
        }
        catch(err){
            test="";
        }
        return test;
    }
    async getLibre() {
        var test = "";
        try {
            test = await Model.DB.get('libre');
        }
        catch (err) {
            test = "";
        }
        return test;
    }
    static  DB = level('db');
    async getMessageId(){
        var messageId=null;
        try{
            messageId=await Model.DB.get('messageId');
        }
        catch(err){
            if (err instanceof errors.NotFoundError) {
                messageId=null;
            }
            else{
                console.log(err);
                messageId=null;
            }
        }
        return messageId;
    }
    async putLibre(libre:string){
        await Model.DB.put('libre',libre);

    }
    async PutOccupe(occupe:string){
        await Model.DB.put('occupe', occupe);
    }
    async putMessageId(message: any){
        await Model.DB.put('messageId',message);
    }
    async toggleChannel(lastchannel:number,channel:TextChannel,name:string,interaction:CommandInteraction<CacheType>,state:number){
        var test=false;
        var openChannel=null;
        if(state==0){
        
        }
        else if(state==1){
            openChannel=true;
        }
        else if(state==2){
            openChannel = false;
        }
        for (var i = 1; i <= lastchannel; i++) {
            var isOpen = await this.getIsOpen(false,i,interaction);
            if (isOpen==null){
                Model.DB.del("channel"+i);
            }
            else if (channel.name == name + i && (isOpen == openChannel ||openChannel==null) ) {
                interaction.reply({
                    embeds: [new MessageEmbed().setTitle('Demande fermé').setDescription('Le salon a été correctement fermé')],
                });
                test = true;
                    channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: isOpen });
                const libre = await this.getLibre();
                const occupe= await this.getOccupe();
                    if(isOpen==true){
                        channel.setParent(libre);
                    }
                    else{
                        channel.setParent(occupe);
                    }


                Model.DB.put("channel+i", isOpen);
            }
        }
        if (test == false) { interaction.reply({ content: 'ce salon ne peut pas être fermé', ephemeral: true }); }
    }
    async getIsOpen(isReply: boolean,i:number, interaction: CommandInteraction<CacheType>):Promise<boolean> {
        var test='false';
        var open=false;
        try{
        test=await Model.DB.get("channel" + i);
        }
        catch(err){
            if (err instanceof errors.NotFoundError) {

                if (isReply) {
                    interaction.reply("vous ne pouvez pas fermer de salon car le bot n'a pas été configuré");
                    test=null;

                }
                else {
                    test = null;
                    console.log(err);
                }
                
            }
        }
        if(test!=null){
            open=test=='true';
        }
        else{
            open=null;
        }
        return open;
    }

   async getName(isReply:boolean,interaction:CommandInteraction<CacheType>){
       var name="support";
       try {
           name = await Model.DB.get('name');
       }
       catch (err) {
           if (err instanceof errors.NotFoundError) {

               if(isReply){
                   interaction.reply("vous ne pouvez pas fermer de salon car le bot n'a pas été configuré");
                   name="";
               }
               else{
                   name = "support";
               }

           }
           else {
               console.log(err);
           }

       }
       return name;
   } 
    async getLastChannel(isReply: boolean, interaction: CommandInteraction<CacheType>){
       var lastchannel:number=1;
       try {
           lastchannel = await Model.DB.get('lastchannel');
       }
       catch (err) {
           if (err instanceof errors.NotFoundError) {
               if(isReply){
                   interaction.reply("vous ne pouvez pas fermer de salon car le bot n'a pas été configuré");
                var lastchannel=-1;
               }
               else{
                   var lastchannel = 1;
               }

           }
           else {
               console.log(err);
           }
       }
       return lastchannel;
   }
   async putChannel(i:number){
       await Model.DB.put('channel' + i, 'true');
   }
   async putLastChannel(lastchannel:number){
       await Model.DB.put('lastchannel', lastchannel);
   }
   async deleteChannel(i:number){
      await Model.DB.del('channel' + i);
   }
   async putName(name:string){
       await Model.DB.put('name',name);
   }
}