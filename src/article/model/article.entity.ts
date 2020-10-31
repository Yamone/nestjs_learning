import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/model/base-entity';
import { UserEntity } from 'src/user/model/user.entity';
import { ArticleCategoryEntity } from 'src/article-category/model/article-category.entity';

@Entity('article_tbl') //define the custom table name
export class articleEntity extends BaseEntity {
  @Column()
  title: string;
  @Column()
  description: string;

  @ManyToOne(
    type => UserEntity,
    user => user.articles,
  )
  @JoinColumn({ name: 'user_id' }) //define the custom the column name
  user_id: UserEntity;

  @OneToMany(
    type => ArticleCategoryEntity,
    articlecate => articlecate.article_id,
  )
  articlecates: ArticleCategoryEntity[];
}
