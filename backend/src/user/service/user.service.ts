import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service'; // Import your Prisma service
import { CreateUserInput, UpdateUserInput } from '../dto/user.mutation.dto';
import * as bcrypt from 'bcrypt';
import {GetUserInfo} from '../dto/user.query.dto'
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserInput): Promise<GetUserInfo> {
    const { password, ...userData } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user:GetUserInfo = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return {id: user.id, email: user.email, name: user.name };
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(data: UpdateUserInput) {
    const { id, ...rest } = data;
    return this.prisma.user.update({
      where: { id },
      data: rest,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
