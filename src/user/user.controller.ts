import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  ParseIntPipe,
  Put,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { createSecureServer } from 'http2';
import { createUserDto, updateUserDto, loginDto } from './model/user.dto';
import { identifier } from '@babel/types';
import { async } from 'rxjs';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { hasRoles } from 'src/shared/decorators/role.decorator';
import { UserRole } from './model/user.enum';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiQuery({ name: 'phone', type: String, required: false })
  getUser(@Query('phone') phone: string) {
    return this.userService.getUser(phone);
  }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  postUser(@Body() data: createUserDto) {
    return this.userService.createUser(data);
  }

  @Put(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateUserDto,
  ) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Get('userDetail')
  @ApiBearerAuth()
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBadRequestResponse()
  @ApiOkResponse()
  getUserId(@User() id: number) {
    return this.userService.getUserById(id);
  }

  @Post('login')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  async login(@Body() data: loginDto) {
    return this.userService.login(data);
  }
}
