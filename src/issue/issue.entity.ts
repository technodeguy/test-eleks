import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { StatusType } from '../consts';

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
}