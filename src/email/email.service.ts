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

        return 'Email sent successfully.';
    }

    async sendWelcomeEmail(sendEmailDto: SendEmailDto): Promise<void> {
        const { to, subject, message } = sendEmailDto;
        await this.mailerService.sendMail({
          to: to,
          subject: subject,
          html: message,
        });
      }
}