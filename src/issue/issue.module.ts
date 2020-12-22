import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IssueController } from './issue.controller';
import { Issue } from './issue.entity';
import { IssueService } from './issue.service';
import { SupportAgent } from '../support_agent/support_agent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Issue,
      SupportAgent,
    ]),
  ],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule {}
