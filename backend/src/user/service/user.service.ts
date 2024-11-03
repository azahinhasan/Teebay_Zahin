import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { CreateUserInput, UpdateUserInput } from '../dto/user.mutation.dto';
import * as bcrypt from 'bcrypt';
import {GetUserInfo,GetAllUserInfo} from '../dto/user.query.dto'
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserInput): Promise<GetUserInfo> {
    const { password, ...userData } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return user;
  }

  async findAllUsers(): Promise<GetAllUserInfo>{
    const data = await this.prisma.user.findMany();
    return { list: data };
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(data: UpdateUserInput): Promise<GetUserInfo> {
    const { id, ...rest } = data;

    await this.findUserById(id); //checking user exists or not

    const user = await this.prisma.user.update({
      where: { id },
      data: rest,
    });
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
