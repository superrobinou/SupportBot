import { CacheType, CommandInteraction, Role } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { RootModel } from "../models/root";

@Discord()
export class ChannelRole{
    @Slash('channelrole')
    async execute(@SlashOption('roledemandeur', { type: 'ROLE', description: 'role', required: true }) roleDemandeur: Role, @SlashOption('rolesupport', { type: 'ROLE', description: 'role', required: true }) roleSupport: Role,interaction: CommandInteraction<CacheType>){
        if(interaction.memberPermissions.has('MANAGE_ROLES')){
        var root = await RootModel.findOne({ root: interaction.guild.id });
        root.roleDemandeur=roleDemandeur.id;
        root.roleSupport=roleSupport.id;
        root.save();
        interaction.reply({content:'rôles modifés',ephemeral:true});
        }
        else {
            interaction.reply({ content: "vous n'avez pas la permission d'utiliser cette commande", ephemeral: true });
        }
    }
}