import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { UnprocessableServiceError } from "../../common/errors/service.error";
import { LoginDto } from "./dto/login.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(data: LoginDto): Promise<string> {
    const user = await this.userRepository.findOneOrFail({ where: { email: data.email.toLowerCase() } });

    const passwordHash = await bcrypt.hash(data.password, user.salt);

    if (user.encryptedPassword !== passwordHash) {
      throw new UnprocessableServiceError("Invalid password provided");
    }

    const payload = { userId: user.id };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
