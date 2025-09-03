import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomConflictHttpException } from 'src/core/exceptions/conflicts.exception';
import { Connection, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new CustomConflictHttpException(
        error.message || 'Error finding user',
        error.status || 500,
      );
    }
  }
  async findUserByGoogle(g: any) {
    try {
      let user: any =
        (await this.userRepository.findOne({
          where: { googleId: g.googleId },
        })) ||
        (g.email
          ? await this.userRepository.findOne({ where: { email: g.email } })
          : null);

      if (!user) {
        user = this.userRepository.create(g);
      } else {
        user.googleId = user.googleId || g.googleId;
        user.name = g.name ?? user.name;
        if (g.email && !user.email) user.email = g.email;
      }

      return await this.userRepository.save(user);
    } catch (error) {
      throw new CustomConflictHttpException(
        error.message || 'Error finding user',
        error.status || 500,
      );
    }
  }

  async register(userData: any) {
    try {
      const user = this.userRepository.create(userData);
      const createdUser = await this.userRepository.save(user);
      return createdUser;
    } catch (error) {
      throw new CustomConflictHttpException(
        error.message || 'Error creating user',
        error.status || 500,
      );
    }
  }

  async findByIdAndGet(userId: number) {
    try {
      return await this.userRepository.findOne({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          // exclude password
        },
      });
    } catch (error) {
      throw new CustomConflictHttpException(
        error.message || 'Error finding user',
        error.status || 500,
      );
    }
  }

  async findByIdAndVerify(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found');
      }
      console.log('s', user);
      if (user.role == 'student') {
        console.log('student');
        user.isVerify = true;
        await this.userRepository.save(user);
        return {
          data: user,
          redirect_url: '/student/dashboard',
          isVerify: true,
        };
      } else {
        return {
          data: user,
          redirect_url: '/teacher',
          isVerify: false,
        };
      }
    } catch (error) {
      throw new CustomConflictHttpException(
        error.message || 'Error finding user',
        error.status || 500,
      );
    }
  }
}
