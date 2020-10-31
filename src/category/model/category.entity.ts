import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleCategoryEntity } from 'src/article-category/model/article-category.entity';

@Entity('category_tbl')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(
    type => ArticleCategoryEntity,
    articlecate => articlecate.category_id,
  )
  articlecates: ArticleCategoryEntity[];
}
