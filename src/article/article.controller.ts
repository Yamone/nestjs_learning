import {
  Controller,
  Post,
  Body,
  Query,
  ParseIntPipe,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { createArtilceDto } from './model/article.dto';
import { getEnabledCategories } from 'trace_events';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiQuery({ name: 'user_id', type: Number, required: false })
  createArticle(
    @Body() data: createArtilceDto,
    @Query('user_id', ParseIntPipe) user_id: number,
  ) {
    return this.articleService.createArticle(user_id, data);
  }
  @Get(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  getArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.getArticleId(id);
  }

  @Put(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: createArtilceDto,
  ) {
    return this.articleService.updateArticle(id, data);
  }
}
