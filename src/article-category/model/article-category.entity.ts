import { Entity, ManyToOne, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { articleEntity } from 'src/article/model/article.entity';
import { CategoryEntity } from 'src/category/model/category.entity';

@Entity('article-category')
export class ArticleCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(
    type => articleEntity,
    articles => articles.articlecates,
  )
  @JoinTable({ name: 'article_id' })
  article_id: number;
  @ManyToOne(
    type => CategoryEntity,
    categories => categories.articlecates,
  )
  @JoinTable({ name: 'category_id' })
  category_id: number;
}
