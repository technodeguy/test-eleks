import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateIssueDto } from './dto';
import { CreateIssueResponse } from './interfaces';
import { IssueService } from './issue.service';

@Controller('issue')
export class IssueController {
  constructor(
    private readonly issueService: IssueService,
  ) {}

  @HttpCode(201)
  @Post('/')
  public async createIssue(@Body() payload: CreateIssueDto): Promise<CreateIssueResponse> {
    return this.issueService.createIssue(payload);
  }
}
