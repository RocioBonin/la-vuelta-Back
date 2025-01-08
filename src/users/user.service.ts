import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { EmailService } from "src/email/email.service";
import { emailHtml } from "src/email/templates/email-welcome";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private emailService: EmailService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const emailExisting = await this.findEmail(createUserDto.email)

        if(emailExisting) {
            throw new ConflictException('Email ya existente')
        }
        
        const user = this.userRepository.create(createUserDto)
        return await this.userRepository.save(user)
    }

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async suscribeUser(email: string) {
        const suscribedUser = await this.userRepository.findOne({
            where:{email: email}
        })

        if(!suscribedUser) {
            throw new NotFoundException('No se encontró un usuario con el email indicado')
        }

        suscribedUser.newsletter = true;

        await this.userRepository.save(suscribedUser);
        
        const message = emailHtml.replace('{{userName}}', suscribedUser.name);
        const to = [suscribedUser.email];
        const subject = 'Mensaje de bienvenida';

        await this.emailService.sendWelcomeEmail({message, to, subject});
        return "Suscripción exitosa"
    }

    async findEmail( email: string ) {
        return await this.userRepository.findOne({where: {email}})
    }
}