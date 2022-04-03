import { Prop, getModelForClass } from '@typegoose/typegoose'; //libraire pour la base de donnée
export class ChannelSupport{
    @Prop()
    channelId:String; //l'identifiant du channel
    @Prop()
    isOpen:boolean; //indique si le  channel est libre ou occupé
    @Prop()
    demandeur:String; // le nom de l'utilisateur dont la demande est en cours
    constructor(channelId:String){
        this.channelId=channelId;
        this.isOpen=true;
    }

}
export const ModelSupport=getModelForClass(ChannelSupport);