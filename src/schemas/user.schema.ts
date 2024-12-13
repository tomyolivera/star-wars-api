import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { UserRole } from '@/types/user-role.types'

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Column({ type: String })
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Column({ type: String })
  password: string
}

export class UserDTO extends AuthDTO {
  @IsEnum(UserRole)
  @IsOptional()
  @Column({ default: UserRole.USER })
  @ApiProperty({ default: UserRole.USER, enum: UserRole })
  role: UserRole
}

@Entity()
export class User extends UserDTO {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column({ nullable: true, default: null })
  @ApiProperty({ nullable: true, default: null })
  token?: string

  @Column({ nullable: true, default: null })
  @ApiProperty({ nullable: true, default: null })
  tokenExp?: Date

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date
}

export interface FindOneOptionsUser {
  column: string
  withPassword?: boolean
}
