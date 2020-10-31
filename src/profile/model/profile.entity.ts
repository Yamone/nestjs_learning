import { Entity, Column, Generated, PrimaryColumn } from 'typeorm';
import { BaseEntity } from 'src/shared/model/base-entity';

@Entity('profile_tbl') //define the custom table name
export class profileEntity extends BaseEntity {
  @Column()
  profile_url: string;
  @Column()
  gender: string;
}
