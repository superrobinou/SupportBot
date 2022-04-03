import * as typegoose from "@typegoose/typegoose";
import { DocumentType, Ref } from '@typegoose/typegoose';
import { Root} from "./root.js";
const {Prop,getModelForClass} =typegoose['default']||typegoose;
export class ChannelSupport{
    @Prop()
    channelId:String;
    @Prop()
    isOpen:boolean;
    @Prop()
    demandeur:String;
    constructor(channelId:String){
        this.channelId=channelId;
        this.isOpen=true;
    }

}
export const ModelSupport=getModelForClass(ChannelSupport);