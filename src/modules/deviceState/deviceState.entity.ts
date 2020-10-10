import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Device } from '../device/device.entity';

/**
 * Device Entity Class
 */
@Entity('devicestate')
export class DeviceState {
  /**
   * ID column
   */
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column()
  latitude: number;

  /**
   * Username column
   */
  @Column()
  longitude: number;

  /**
   * Username column
   */
  @Column()
  speed: number;

  @OneToOne(() => Device, device => device.deviceState)
  @JoinColumn({ name: 'device_id' })
  device!: Device
}
