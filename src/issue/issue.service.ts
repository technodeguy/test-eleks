import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository, IsNull, getManager } from 'typeorm';

import { SupportAgent } from '../support_agent/support_agent.entity';
import { CreateIssueResponse, ICreateIssue } from './interfaces';
import { Issue } from './issue.entity';
import { StatusType } from '../consts';

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

  public async resolveIssue(issueId: number, newStatus: StatusType) {
    const issue = await this.issueRepository.findOne({ where: { id: issueId }, relations: ['support_agent'] });

    this.logger.log(`Issue to be resolved: ${JSON.stringify(issue)}`);

    if (!issue) {
      this.logger.error(`Issue with id ${issueId} was not found`);
      throw new NotFoundException(null, 'NO_SUCH_ISSUE');
    }

    if (issue.status === StatusType.RESOLVED || issue.status === StatusType.REJECTED) {
      this.logger.warn(`Issue with id ${issue.id} already resolved`);
      throw new BadRequestException(null, 'ISSUE_ALREADY_RESOLVED');
    }

    if (issue.support_agent && issue.support_agent.id) {
      await getManager().transaction(async transactionalEntityManager => {
        issue.status = newStatus;
        issue.support_agent.issue = null;
        await transactionalEntityManager.save(issue);
        await transactionalEntityManager.save(issue.support_agent);
        this.logger.log(`Status of issue ${issue.id} was successfully set to ${newStatus}`);
      });
    }
  }

  public async createIssue(data: ICreateIssue): Promise<CreateIssueResponse> {
    return this.issueRepository.save(data);
  }
}
