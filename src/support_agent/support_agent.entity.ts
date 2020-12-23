import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { Issue } from '../issue//issue.entity';

@Entity('support_agent')
export class SupportAgent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 32 })
  password: string;

  @ManyToOne(() => Issue, { nullable: true })
  @JoinColumn({ name: 'issue_id' })
  issue: Issue;
}