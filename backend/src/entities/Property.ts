import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('float')
  price!: number;

  @Column({ nullable: true }) // Add this line to allow null values
  image!: string;

  @Column('int')
  numberOfRooms!: number;

  @Column('float')
  area!: number;
}