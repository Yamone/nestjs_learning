import { ApiProperty } from '@nestjs/swagger';

export class createArticleCategoryDto {
  @ApiProperty()
  article_id: number;
  @ApiProperty()
  category_id: number;
}
