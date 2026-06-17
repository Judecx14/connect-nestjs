import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    name: 'first_name',
  })
  firstName: string;

  @Column('text', {
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @Column('text', {
    nullable: false,
  })
  email: string;

  @Column('text', { nullable: true, name: 'firebase_uid' })
  firebaseUid: string;
}
