import { AbstractDocument } from "@app/common";
import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey:false})
export class Blob extends AbstractDocument {

    @Prop()
    content:string

    @Prop()
    md5:string

    @Prop()
    encoding:string
}

export const BlobSchema = SchemaFactory.createForClass(Blob)