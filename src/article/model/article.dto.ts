import { ApiProperty } from '@nestjs/swagger';

export class createArtilceDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}
