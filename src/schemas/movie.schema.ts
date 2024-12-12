import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @IsNotEmpty()
  @IsString()
  @Column()
  @ApiProperty({ required: true })
  title: string

  @IsNotEmpty()
  @IsNumber()
  @Column()
  @ApiProperty({ required: true })
  episode_id: number

  @IsNotEmpty()
  @IsString()
  @Column('text')
  @ApiProperty({ required: true })
  opening_crawl: string

  @IsNotEmpty()
  @Column()
  @ApiProperty({ required: true })
  director: string

  @IsNotEmpty()
  @IsString()
  @Column()
  @ApiProperty({ required: true })
  producer: string

  @IsNotEmpty()
  @IsString()
  @Column()
  @ApiProperty({ required: true })
  release_date: string

  @IsNotEmpty()
  @IsArray()
  @Column('json')
  @ApiProperty({ type: [String], required: true })
  characters: string[]

  @IsNotEmpty()
  @IsArray()
  @Column('json')
  @ApiProperty({ type: [String], required: true })
  planets: string[]

  @IsNotEmpty()
  @IsArray()
  @Column('json')
  @ApiProperty({ type: [String], required: true })
  starships: string[]

  @IsNotEmpty()
  @IsArray()
  @Column('json')
  @ApiProperty({ type: [String], required: true })
  vehicles: string[]

  @IsNotEmpty()
  @IsArray()
  @Column('json')
  @ApiProperty({ type: [String], required: true })
  species: string[]

  @IsNotEmpty()
  @IsString()
  @Column()
  @ApiProperty({ required: true })
  created: string

  @IsNotEmpty()
  @IsString()
  @Column()
  @ApiProperty({ required: true })
  edited: string

  @IsNotEmpty()
  @IsString()
  @Column()
  @ApiProperty({ required: true })
  url: string

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date
}
