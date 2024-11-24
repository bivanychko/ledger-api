import { Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor() {}

  @Post("login")
  login(): string {
    return "Logged in";
  }
}
