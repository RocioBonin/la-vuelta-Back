import { Body, Controller, Post} from "@nestjs/common";
import { EmailService } from "./email.service";
import { SendEmailDto } from "./dto/send-email.dto";
import { ApiTags } from "@nestjs/swagger";
import { formContactDto } from "./dto/form-contact.dto";

@ApiTags('Email')
@Controller("email")
export class EmailController{
    constructor(private emailService: EmailService){}
    
   @Post('sendEmail')
    async sendMail(@Body() sendEmailDto: SendEmailDto){
        try {
            const { from, to, subject, message } = sendEmailDto;
            return await this.emailService.sendEmail({ from, to, subject, message });
        } catch (error) {
            throw error;      
        }
    } 

    @Post('formContact')
    async formContact(@Body() formContactDto: formContactDto) {
        try {
            const { from, subject, message } = formContactDto;
            return this.emailService.formContact({ from, subject, message });
        } catch (error) {
            throw error;      
        }
    }
}