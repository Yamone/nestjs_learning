import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './model/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './model/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}
  async createCategory(data: CategoryDto) {
    return await this.categoryRepo.save(data);
  }
}
