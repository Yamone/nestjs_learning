import { Module } from '@nestjs/common';
import { ArticleCategoryController } from './article-category.controller';
import { ArticleCategoryService } from './article-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryEntity } from './model/article-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategoryEntity])],
  controllers: [ArticleCategoryController],
  providers: [ArticleCategoryService],
  exports: [ArticleCategoryService],
})
export class ArticleCategoryModule {}
