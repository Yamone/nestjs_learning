import { Controller, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './model/category.dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  createCategory(@Body() data: CategoryDto) {
    return this.categoryService.createCategory(data);
  }
}
