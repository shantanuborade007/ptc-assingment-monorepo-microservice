import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  tenetId: string;

  @IsString()
  clientId: string; 

  @IsString()
  appId: string; 
}
