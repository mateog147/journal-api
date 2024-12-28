import { IEntry } from 'src/journal/domain/model';
import {
  Column,
  Entity,
  PrimaryColumn,
  Check,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'entries' })
export class Entry implements IEntry {
  @PrimaryColumn()
  @Column({ primary: true, unique: true, type: 'uuid' })
  id: string;

  @Column({ name: 'user_id', unique: false })
  userId: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    nullable: true,
    default: () => "(now() at time zone 'utc')",
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
    nullable: true,
    default: () => "(now() at time zone 'utc')",
  })
  updateAt: Date;
}
