import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../client/client.entity';
import { DeviceState } from '../deviceState/deviceState.entity';

/**
 * Device Entity Class
 */
@Entity('device')
export class Device {
  /**
   * ID column
   */
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column()
  client_id: number;

  /**
   * Username column
   */
  @Column()
  name: string;

  /**
   * Username column
   */
  @Column()
  description: string;

  /**
   * Username column
   */
  @Column({
    name: 'begindate',
    type: 'datetime',
  })
  begindate: Date;

  @ManyToOne(() => Client, client => client.devices)
  @JoinColumn({ name: 'client_id' })
  client!: Client

  @OneToOne(() => DeviceState, deviceState => deviceState.device)
  @JoinColumn({ name: 'device_id' })
  deviceState!: DeviceState
}
