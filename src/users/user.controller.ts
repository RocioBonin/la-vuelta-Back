import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { SubscribeUserDto } from "src/email/dto/suscription-user.dto";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private usersService: UserService) {}

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Get() 
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Post('suscribe')
    suscribeUser( @Body() email: SubscribeUserDto ){
        return this.usersService.suscribeUser(email)
    }
}