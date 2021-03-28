import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { HashedPassword } from './HashedPassword'

interface UserProps {
  email: string
  firstName: string
  lastName: string
  password: HashedPassword
}

interface RegisterUserProps {
  email: string
  firstName: string
  lastName: string
  plainPassword: string
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number

  @Column({ name: 'email', unique: true })
  private email: string

  @Column({ name: 'first_name' })
  private firstName: string

  @Column({ name: 'last_name' })
  private lastName: string

  @Column((type) => HashedPassword, { prefix: '' })
  private password: HashedPassword

  private constructor(props?: UserProps) {
    if (props !== undefined) {
      this.email = props.email
      this.firstName = props.firstName
      this.lastName = props.lastName
      this.password = props.password
    }
  }

  public static async register({
    email,
    firstName,
    lastName,
    plainPassword,
  }: RegisterUserProps) {
    const password = await HashedPassword.fromPlainPassword(plainPassword)
    return new User({
      email,
      firstName,
      lastName,
      password,
    })
  }

  public get() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    }
  }

  public getId() {
    return this.id
  }

  public verifyPassword(plainPassword: string) {
    return this.password.verify(plainPassword)
  }
}
