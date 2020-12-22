import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateIssue } from './interfaces';
import { Issue } from './issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>
  ) {}

  public async createIssue(data: ICreateIssue): Promise<void> {
    await this.issueRepository.save(data);
  }
}
