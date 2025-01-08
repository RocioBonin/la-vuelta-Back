import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendEmailDto } from "./dto/send-email.dto";

@Injectable()
export class EmailService {
    constructor( private mailerService: MailerService){}

    async sendEmail(SendEmailDto: SendEmailDto): Promise<string>{
        const { to, subject, message} = SendEmailDto
        await this.mailerService.sendMail({
            to: to,
            subject: subject,
            text: message,
        })

        return 'Correo electrónico enviado exitosamente.';
    }

    async sendWelcomeEmail(sendEmailDto: SendEmailDto): Promise<void> {
        const { to, subject, message } = sendEmailDto;
        await this.mailerService.sendMail({
          to: to,
          subject: subject,
          html: message,
        });
      }

      async formContact(sendEmailDto: SendEmailDto) {
        const { from, subject, message } = sendEmailDto;
        await this.mailerService.sendMail({
          from: from,
          to: 'La Vuelta Logistica <codigototaldevs@gmail.com>',
          subject: subject,
          html: message,
        });

        return "Mensaje enviado con éxito"  
    }
}