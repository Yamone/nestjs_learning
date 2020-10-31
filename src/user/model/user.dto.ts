import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsNumber, IsEmail } from 'class-validator';
import { profileDto } from 'src/profile/model/profile.dto';
import { PassThrough } from 'stream';

export class createUserDto {
  @ApiProperty()
  @IsNotEmpty() // validation
  username: string;
  @ApiPropertyOptional()
  @MinLength(8)
  phone: string;
  @ApiPropertyOptional()
  @IsEmail() // validation
  email: string;
  @ApiProperty({ type: profileDto })
  profile: profileDto;
  @ApiProperty()
  password: string;
}

export class updateUserDto {
  @ApiPropertyOptional()
  username: string;
  @ApiPropertyOptional()
  phone: string;
  @ApiPropertyOptional()
  email: string;
  @ApiProperty({ type: profileDto })
  profile: profileDto;
}

export class loginDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
}
