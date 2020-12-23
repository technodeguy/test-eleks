import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
