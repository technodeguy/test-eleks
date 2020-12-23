import { Issue } from "../issue.entity";

export interface ICreateIssue {
  email: string;
  message: string;
}

export type CreateIssueResponse = Issue;