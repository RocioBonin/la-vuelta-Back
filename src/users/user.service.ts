import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { EmailService } from "src/email/email.service";
import { emailHtml } from "src/email/templates/email-welcome";
import { SubscribeUserDto } from "src/email/dto/suscription-user.dto";
import { SignupAuthDto } from "src/auth/dto/signup-auth.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private emailService: EmailService,
    ) {}

    async createUser(signUpUserDto: SignupAuthDto) {
        const { name, surname, email, password, idNumber, location, phone, birthdate} = signUpUserDto
        const emailExisting = await this.findEmail(email)

        if(emailExisting) {
            throw new ConflictException('Email ya existente')
        }

        const idNumberExisting = await this.userRepository.findOne({
            where: {idNumber}
        })

        if(idNumberExisting) {
            throw new ConflictException('El documento de identidad ya esta registrado')
        }
        
        const user = new User();
        user.name = name;
        user.surname = surname;
        user.email = email;
        user.password = password;
        user.idNumber = idNumber;
        user.location = location;
        user.phone = phone;
        user.birthdate = birthdate;
        user.newsletter = true;

        await this.userRepository.save(user);
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async suscribeUser(emailDto: SubscribeUserDto) {

        const {email} = emailDto;

        const suscribedUser = await this.userRepository.findOne({
            where:{ email }
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