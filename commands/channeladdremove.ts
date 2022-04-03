

import { CacheType, CommandInteraction} from 'discord.js'; 
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { ChannelSupport } from '../models/channel';
import { RootModel } from '../models/root';

    //commande pour ajouter ou enlever des channels
@Discord()
 class ChannnelAddRemove{

    @Slash('cm')
    async execute(@SlashChoice("add","add") @SlashChoice("remove","remove") @SlashOption("state")state:string,@SlashOption("number",{type:"INTEGER",description:"number",minValue:1,required:true}) number:number,interaction:CommandInteraction<CacheType>) {
        //vérifie si l'utilisateur a la permission de l'utiliser
        if (interaction.memberPermissions.has('MANAGE_CHANNELS')) {
        //récupération des données par rapport au serveur d'ou est lancé la commande
        var root = await RootModel.findOne({ guildId: interaction.guild.id });
       //récupération de la catégorie libre
        var libre= root.categoryLibre;
               //récupération de la catégorie occupé
        var occupe =root.categoryOccupe;
        //si les catégorie n'existent pas encore, création des catégories en questions et enregistrement dans la base de donnée
        if (libre==undefined){
            var test=await interaction.guild.channels.create('libre',{type:'GUILD_CATEGORY',reason:'libre'});
            libre=test.id;
            root.categoryLibre=libre;
        }
        if(occupe==undefined){
            var test2 = await interaction.guild.channels.create('occupé', { type: 'GUILD_CATEGORY', reason: 'occupé' });
            occupe=test2.id;
            root.categoryOccupe=occupe;
        }
        //récupération du nom de base du channel
        var nom=root.nom;
            //récupération du numéro du dernier channel
            var lastchannel= root.lastChannel;
            //le numéro correspondant au prochain dernier channel aprés les modifications
            var newLastchannel = 0;

            if (state == "add") {
                            //création des channels et leurs enreigstrement dans la base de donnée 
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
                                            //suppression des channels + supression dans la db
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
        //réponse à l'interaction-réussite
        interaction.reply({content:'channel crée/supprimé!',ephemeral:true});
    }
        else {
                    //réponse à l'interaction-échec
            interaction.reply({ content: "vous n'avez pas la permission d'utiliser cette commande", ephemeral: true });
        }
    }
}

export default ChannnelAddRemove;