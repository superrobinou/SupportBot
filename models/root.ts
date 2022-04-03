
import {ChannelSupport} from "./channel.js"; //modéle des channels textuels
import {Prop, getModelForClass } from  '@typegoose/typegoose'; //libraire pour la base de donnée
export class Root{
    @Prop()
    guildId:string; //l'identifiant du serveur
    @Prop()
    categoryOccupe: string; //la catégorie occupé du serveur
    @Prop()
    categoryLibre: string; //la catégorie libre du serveur
    @Prop()
    buttonId: String; //l'id du bouton qui ouvre les channels de support
    @Prop()
    nom: string; //nom de départ des channels (un chiffre est ajouté automatiquement aprés)
    @Prop()
    roleDemandeur:string; //role du demandeur (est utile lorsque vous ne souhaitez pas que n'importe qui puisse ouvrir un ticket)
    @Prop()
    lastChannel:number; //numéro du dernier channel crée
    @Prop()
    roleSupport:string; //role du support (il a la perm de fermer les salons de support)
    @Prop({type:()=>ChannelSupport})
    channels:ChannelSupport[];//les channels
}
export const RootModel=getModelForClass(Root);