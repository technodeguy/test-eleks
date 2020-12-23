import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository, IsNull, Not, getManager } from 'typeorm';

import { SupportAgent } from 'src/support_agent/support_agent.entity';
import { CreateIssueResponse, ICreateIssue } from './interfaces';
import { Issue } from './issue.entity';
import { StatusType } from 'src/consts';

@Injectable()
export class IssueService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(SupportAgent)
    private readonly supportAgentRepository: Repository<SupportAgent>,
  ) {
    this.logger = new Logger(IssueService.name);
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // public async issueResolverCron() {
  //   const busyAgent = await this.supportAgentRepository.findOne({ where: { issue: Not(IsNull()) }, relations: ['issue'] })
    
  //   if (busyAgent && busyAgent.issue) {
  //     // TODO setup mailService to connect to support agent`s mail and send message to user
  //     // Resolving issue by agent

  //     await this.issueRepository.update({ id: busyAgent.issue.id }, { is_being_processed: false, is_resolved: true });
  //     busyAgent.issue = null;
  //     await this.supportAgentRepository.save(busyAgent)
  //   }
  // }

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async attachFreeAgentToIssueCron() {
    this.logger.log('Running cron - looking for all unassigned issues to process');
    const issueToProcess = await this.issueRepository.findOne({ status: StatusType.NEW });
    
    if (issueToProcess) {
      const firstFreeAgent = await this.supportAgentRepository.findOne({ issue: IsNull() });
      
      if (firstFreeAgent) {
        this.logger.log(`Attaching ${firstFreeAgent.email} agent to issue ${issueToProcess.id}`);
        firstFreeAgent.issue = issueToProcess;
        issueToProcess.status = StatusType.PROCESSED;
        await getManager().transaction(async transactionalEntityManager => {
          await transactionalEntityManager.save(issueToProcess);
          await transactionalEntityManager.save(firstFreeAgent);
        });
      }
    }
  }

  public async createIssue(data: ICreateIssue): Promise<CreateIssueResponse> {
    return this.issueRepository.save(data);
  }
}
