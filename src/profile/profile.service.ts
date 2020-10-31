import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profileEntity } from './model/profile.entity';
import { Repository } from 'typeorm';
import { profileDto } from './model/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(profileEntity)
    private readonly profileRepo: Repository<profileEntity>,
  ) {}
  async createProfile(data: profileDto) {
    return await this.profileRepo.save(data);
  }
  async updateProfile(id: number, data: profileDto) {
    return await this.profileRepo.update(id, data);
  }
}
