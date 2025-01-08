import { Body, Controller, Post } from "@nestjs/common";
import { SignupAuthDto } from "./dto/signup-auth.dto";
import { AuthServices } from "./auth.service";
import { UserResponseDto } from "src/users/dto/response-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthServices,
    ) {}

    @Post('signup')
    async signUp ( @Body() signupAuthDto: SignupAuthDto ) {
        const newUser = await this.authService.signUp( signupAuthDto )
        return new UserResponseDto(newUser);
    }
}