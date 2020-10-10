import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Device } from '../device/device.entity';
/**
 * Profile Entity Class
 */
@Entity('client')
export class Client {
  /**
   * ID column
   */
  @PrimaryGeneratedColumn()
  client_id: number;

  /**
   * Username column
   */
  @Column()
  commercialname: string;

  /**
   * Username column
   */
  @Column()
  description: string;

  /**
   * Username column
   */
  @Column()
  country: string;

  /**
   * Username column
   */
  @Column()
  clientstatus: number;

  /**
   * Username column
   */
  @Column({
    name: 'begindate',
    type: 'datetime',
  })
  begindate: Date;

  @OneToMany(() => Device, devices => devices.client, {
    cascade: true,
  })
  devices!: Device[]
}
