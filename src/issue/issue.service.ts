import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository, IsNull, Not } from 'typeorm';

import { SupportAgent } from 'src/support_agent/support_agent.entity';
import { ICreateIssue } from './interfaces';
import { Issue } from './issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(SupportAgent)
    private readonly supportAgentRepository: Repository<SupportAgent>
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async issueResolverCron() {
    const busyAgent = await this.supportAgentRepository.findOne({ where: { issue: Not(IsNull()) }, relations: ['issue'] })
    
    if (busyAgent && busyAgent.issue) {
      // TODO setup mailService to connect to support agent`s mail and send message to user
      // Resolving issue by agent
      
      await this.issueRepository.update({ id: busyAgent.issue.id }, { is_being_processed: false, is_resolved: true });
      busyAgent.issue = null;
      await this.supportAgentRepository.save(busyAgent)
    }
  }

  public async createIssue(data: ICreateIssue): Promise<void> {
    const issue = await this.issueRepository.save(data);
    const firstFreeAgent = await this.supportAgentRepository.findOne({ issue: null })

    if (firstFreeAgent) {
      firstFreeAgent.issue = issue;
      await this.supportAgentRepository.save(firstFreeAgent);
      await this.issueRepository.update({ id: issue.id }, { is_being_processed: true });     
    }
  }
}
