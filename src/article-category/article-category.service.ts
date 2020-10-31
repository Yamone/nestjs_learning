import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCategoryEntity } from './model/article-category.entity';
import { Repository } from 'typeorm';
import { createArticleCategoryDto } from './model/article-category.dto';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @InjectRepository(ArticleCategoryEntity)
    private readonly articlecateRepo: Repository<ArticleCategoryEntity>,
  ) {}

  async createArticleCategory(data: createArticleCategoryDto) {
    await this.articlecateRepo.save(data);
  }
}
