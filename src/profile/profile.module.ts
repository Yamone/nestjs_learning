import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profileEntity } from './model/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([profileEntity])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService], // injection no 1
})
export class ProfileModule {}
