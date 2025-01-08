import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

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
    suscribeUser( @Body() body: { email: string } ){
        return this.usersService.suscribeUser(body.email)
    }
}