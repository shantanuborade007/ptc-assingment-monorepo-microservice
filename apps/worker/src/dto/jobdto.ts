import {IsNotEmpty} from 'class-validator'

export class JobDto {
    
    @IsNotEmpty()
    readonly imgURL:string

    @IsNotEmpty()
    readonly status:string
}