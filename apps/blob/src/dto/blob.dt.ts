import {IsNotEmpty} from 'class-validator'

export class BlobDto {
    
    @IsNotEmpty()
    readonly content:string

    @IsNotEmpty()
    readonly md5:string
}