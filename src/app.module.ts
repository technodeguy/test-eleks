import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssueController } from './issue/issue.controller';

@Module({
  imports: [],
  controllers: [AppController, IssueController],
  providers: [AppService],
})
export class AppModule {}
