import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { Issue } from './issue.entity';

@Entity('support_agent')
export class SupportAgent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 32 })
  password: string;

  @OneToOne(() => Issue, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'issue_id' })
  issue: Issue;
}