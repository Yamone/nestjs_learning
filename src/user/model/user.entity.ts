import {
  Entity,
  Column,
  BeforeInsert,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/shared/model/base-entity';
import { profileEntity } from 'src/profile/model/profile.entity';
import { articleEntity } from 'src/article/model/article.entity';

@Entity('user_tbl') //define the custom table name
export class UserEntity extends BaseEntity {
  @Column()
  username: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  password: string;

  @OneToOne(type => profileEntity, { cascade: true })
  @JoinColumn({ name: 'profile_id' }) //define the custom the column name
  profile_id: profileEntity;

  @OneToMany(
    type => articleEntity,
    articleEntity => articleEntity.user_id,
    { cascade: true }, // declare the join table for update and delete
  )
  articles: articleEntity[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
