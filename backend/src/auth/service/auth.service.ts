import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/service/prisma.service';
import { LoginResponse } from '../dto/login-response.dto'; 
import * as dotenv from 'dotenv';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: username },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const payload = { id: user.id };
    const options = {
      expiresIn: process.env.JWT_EXPIRES_IN || '6h',
    };
  
    const accessToken = this.jwtService.sign(payload, options);
    return { token: accessToken };
  }
  
}
