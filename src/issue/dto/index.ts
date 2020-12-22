import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

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
