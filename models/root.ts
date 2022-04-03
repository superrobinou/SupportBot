import * as typegoose from "@typegoose/typegoose";
import { DocumentType, Ref } from '@typegoose/typegoose';
import {ChannelSupport} from "./channel.js";
import {Prop, getModelForClass } from  '@typegoose/typegoose';
export class Root{
    @Prop()
    guildId:string;
    @Prop()
    categoryOccupe: string;
    @Prop()
    categoryLibre: string;
    @Prop()
    buttonId: String;
    @Prop()
    nom: string;
    @Prop()
    roleDemandeur:string;
    @Prop()
    lastChannel:number;
    @Prop()
    roleSupport:string;
    @Prop({type:()=>ChannelSupport})
    channels:ChannelSupport[];
}
export const RootModel=getModelForClass(Root);