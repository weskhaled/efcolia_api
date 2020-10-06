import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PasswordTransformer } from './password.transformer';
// import { EncryptionTransformer } from "typeorm-encrypted";
/**
 * Profile Entity Class
 */
@Entity({
  name: 'user',
})
export class User {
  /**
   * UUID column
   */
  @PrimaryGeneratedColumn()
  user_id: number;

  /**
   * Username column
   */
  @Column()
  login: string;

  /**
   * Username column
   */
  @Column()
  firstname: string;

  /**
   * Username column
   */
  @Column()
  lastname: string;

  /**
   * Username column
   */
  @Column()
  lang: string;

  /**
   * Username column
   */
  @Column({
    name: 'begindate',
    type: 'datetime',
  })
  begindate: Date;

  /**
   * Username column
   */
  // @Column({ type: 'json', nullable: true })
  // @Column({ type: 'longtext', nullable: true })
  // public permissions: string;

  @Column('simple-json', {
    nullable: true,
  })
  permissions: object

  /**
   * Column that employs the PasswordTransformer to hash passwords before writing to database
   */
  @Column({
    name: 'password',
    type: 'blob',
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password: string;
}
