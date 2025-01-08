import { HttpException, Injectable } from "@nestjs/common";
import { SignupAuthDto } from "./dto/signup-auth.dto";
import { UserService } from "src/users/user.service";
import { hash, compare } from "bcryptjs";

 @Injectable()
 export class AuthServices {
    constructor(
        private usersService: UserService,
    ) {}

    async signUp(signupAuthDto: SignupAuthDto) {
        if(signupAuthDto.password !== signupAuthDto.repeatPassword) {
            throw new HttpException('Las contraseñas no coinciden', 400)
        }

        signupAuthDto.newsletter = true;

        signupAuthDto.password = await hash(signupAuthDto.password, 10)
        await this.usersService.createUser(signupAuthDto)

        return signupAuthDto;
    }
 }