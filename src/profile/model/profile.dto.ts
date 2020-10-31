import { ApiProperty } from '@nestjs/swagger';

export class profileDto {
  @ApiProperty()
  profile_url: string;
  @ApiProperty()
  gender: string;
}
