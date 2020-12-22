import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IssueController } from './issue/issue.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [IssueController],
  providers: [],
})
export class AppModule {}
