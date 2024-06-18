import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Blob } from "./schemas/blob.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class BlobRepository extends AbstractRepository<Blob>{
    protected readonly logger = new Logger(BlobRepository.name);

    constructor(
        @InjectModel(Blob.name) blobModel :Model<Blob>,
        @InjectConnection() connection :Connection
    ){
        super(blobModel,connection)
    }
}