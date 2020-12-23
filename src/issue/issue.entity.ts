import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { StatusType } from '../consts';
import { SupportAgent } from '../support_agent/support_agent.entity';

@Entity('issue')
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  message: string;

  @Column({ type: 'int', default: StatusType.NEW })
  status: StatusType;

  @OneToOne(() => SupportAgent, supportAgent => supportAgent.issue)
  support_agent: SupportAgent;
}