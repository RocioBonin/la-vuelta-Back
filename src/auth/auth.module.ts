import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";
import { UsersModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";

@Module({
    imports:[UsersModule, TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthServices]
})
export class AuthModule {}