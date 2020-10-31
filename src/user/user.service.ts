import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { createUserDto, updateUserDto, loginDto } from './model/user.dto';
import { ArticleService } from 'src/article/article.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/shared/auth/auth.service';
import { ProfileService } from 'src/profile/profile.service';
import { UserRole } from './model/user.enum';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) //db connect from service
    private readonly userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
    private readonly authService: AuthService,
    @Inject(forwardRef(() => ProfileService)) // injection no 3
    private readonly profileService: ProfileService,
  ) {}
  async getUser(data: string) {
    return await this.userRepo.findOne({
      where: { phone: data },
      relations: ['profile_id'],
    });
  }

  async createUser(data: createUserDto) {
    let profile = await this.profileService.createProfile(data.profile);
    let user = { ...data, profile_id: profile };
    user.password = await this.authService.hashPassword(data.password);
    return await from(this.userRepo.save(user)).pipe(
      map(user => {
        delete user.password;
        delete user.profile_id;
        return user;
      }),
    );
  }

  async updateUser(id: number, data: Partial<updateUserDto>) {
    await this.userRepo.update(id, data);
    return await this.userRepo.findOne(id, { relations: ['profile_id'] });
  }

  async getUserById(id: number) {
    const data = await this.userRepo.findOne(id, {
      relations: ['profile_id', 'articles'],
    });
    if (!data) throw new BadRequestException('userid not found');
    return data;
  }

  async deleteUser(id: number) {
    let user = await this.getUserById(id);
    return await this.userRepo.softRemove(user);
  }

  async login(data: loginDto) {
    let user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user) throw new BadRequestException('email not found!');
    let match = await this.authService.comparePassword(
      data.password,
      user.password,
    );
    if (!match) {
      throw new UnauthorizedException('password is not matched');
    }
    const jwt = await this.authService.generateJwt({
      id: user.id,
      type: UserRole.ADMIN,
    });
    return { accessToken: jwt };
  }
}
