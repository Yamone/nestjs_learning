import { Module, forwardRef } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { articleEntity } from './model/article.entity';
import { ArticleCategoryModule } from 'src/article-category/article-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([articleEntity]),
    forwardRef(() => ArticleCategoryModule),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
