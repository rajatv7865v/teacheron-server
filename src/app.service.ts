import { Injectable } from '@nestjs/common';
import { MailService } from './providers/mail/mail.service';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
