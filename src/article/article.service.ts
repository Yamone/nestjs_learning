import {
  Injectable,
  Inject,
  forwardRef,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { articleEntity } from './model/article.entity';
import { Repository } from 'typeorm';
import { createArtilceDto } from './model/article.dto';
import { ArticleCategoryService } from 'src/article-category/article-category.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(articleEntity)
    private readonly articleRepo: Repository<articleEntity>,
    @Inject(forwardRef(() => ArticleCategoryService))
    private readonly articlecateService: ArticleCategoryService,
  ) {}
  async getArticle() {
    return 'I am article!';
  }
  async createArticle(user_id, data: createArtilceDto) {
    let newarticle = new articleEntity();
    newarticle.title = data.title;
    newarticle.description = data.description;
    newarticle.user_id = user_id;
    newarticle = await this.articleRepo.save(newarticle);
    await this.articlecateService.createArticleCategory({
      article_id: newarticle.id,
      category_id: 1,
    });
    return newarticle;
  }

  async getArticleId(id) {
    try {
      let data = await this.articleRepo.findOne(id, {
        relations: ['user_id', 'articlecates', 'articlecates.category_id'],
      });
      if (!data) {
        throw new NotFoundException('article not found!');
      }
      return data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateArticle(id: number, data: createArtilceDto) {
    return await this.articleRepo.update(id, data);
  }
}
