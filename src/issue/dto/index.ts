import { IsNotEmpty, IsString, Length, IsEmail, IsNumber, IsIn } from 'class-validator';
import { StatusType } from '../../consts';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 32)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 32)
  readonly message: string;
}

export class ResolveIssueDto {
  @IsNotEmpty()
  @IsNumber()
  readonly issueId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([StatusType.RESOLVED, StatusType.REJECTED])
  readonly newStatus: StatusType;
}
