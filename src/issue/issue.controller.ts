import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';

import { CreateIssueDto, ResolveIssueDto } from './dto';
import { CreateIssueResponse } from './interfaces';
import { IssueService } from './issue.service';

@Controller('issues')
export class IssueController {
  constructor(
    private readonly issueService: IssueService,
  ) {}

  @HttpCode(201)
  @Post('/')
  public async createIssue(@Body() payload: CreateIssueDto): Promise<CreateIssueResponse> {
    return this.issueService.createIssue(payload);
  }

  @HttpCode(204)
  @Put('/resolving')
  public async resolveIssue(@Body() payload: ResolveIssueDto): Promise<void> {
    await this.issueService.resolveIssue(payload.issueId, payload.newStatus);
  }
}
