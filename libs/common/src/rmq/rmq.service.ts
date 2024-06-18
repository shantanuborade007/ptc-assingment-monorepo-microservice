import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transport,RmqOptions } from "@nestjs/microservices";
import { options } from "joi";


@Injectable()
export class RmqService{

    constructor(private readonly configService:ConfigService){}

    getOptions(queue:string,noAck = false):RmqOptions{
        return{
            transport: Transport.RMQ,
            options:{
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                queue:this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent:true
            }
        }
    }
}