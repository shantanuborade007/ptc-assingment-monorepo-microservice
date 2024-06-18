import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({versionKey:false})
export class Job extends AbstractDocument{
    @Prop()
    imgURL:string;

    @Prop()
    userId:string

    @Prop()
    status:string
    
    @Prop()
    tenetId:string

    @Prop()
    clientId:string
}

export const JobSchema = SchemaFactory.createForClass(Job)