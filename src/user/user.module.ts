import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ArticleModule } from 'src/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => ArticleModule),
    forwardRef(() => ProfileModule), // inject no 2
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
