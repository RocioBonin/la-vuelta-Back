import { Body, Controller, Post} from "@nestjs/common";
import { EmailService } from "./email.service";
import { SendEmailDto } from "./dto/send-email.dto";

@Controller("email")
export class EmailController{
    constructor(private emailService: EmailService){}
    
   @Post('sendEmail')
    async sendMail(@Body() sendEmailDto: SendEmailDto){
        try {
            const { to, subject, message } = sendEmailDto;
            return await this.emailService.sendEmail({ to, subject, message });
        } catch (error) {
            throw error       
        }
    } 
}