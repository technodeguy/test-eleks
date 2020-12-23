import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { SupportAgent } from '../support_agent/support_agent.entity';

@Entity('issue')
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  message: string;

  @Column({ type: 'int', default: false })
  is_being_processed: boolean;

  @Column({ type: 'int', default: false })
  is_resolved: boolean;

  // @ManyToOne(() => SupportAgent, { onDelete: 'CASCADE', nullable: true })
  // @JoinColumn({ name: 'support_agent_id' })
  // support_agent: SupportAgent;
}