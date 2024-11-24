import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { config } from "../../config";
import { User } from "../../modules/auth/entities/user.entity";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("No token provided");
    }

    let userId: number;
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: config.JWT_SECRET });

      userId = payload.userId;
    } catch {
      throw new UnauthorizedException("Invalid JWT");
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException("User does not exist");
    if (user.isLocked) throw new ForbiddenException("User is locked");

    request["userId"] = userId;

    return true;
  }
}
