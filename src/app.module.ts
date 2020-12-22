import { Module } from '@nestjs/common';
import path = require('path');

import { IssueController } from './issue/issue.controller';
import { IssueService } from './issue/issue.service';
import { IssueModule } from './issue/issue.module';
import { DatabaseModule } from './database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issue/issue.entity';
import { SupportAgent } from './support_agent/support_agent.entity';

@Module({
  imports: [
    DatabaseModule,
    IssueModule,
    TypeOrmModule.forFeature([
      Issue,
      SupportAgent,
    ]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
})
export class AppModule {}
