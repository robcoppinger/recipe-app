import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

interface UserProps {
  email: string
  firstName: string
  lastName: string
}

interface RegisterUserProps {
  email: string
  firstName: string
  lastName: string
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

  private constructor(props?: UserProps) {
    if (props !== undefined) {
      this.email = props.email
      this.firstName = props.firstName
      this.lastName = props.lastName
    }
  }

  public static register({ email, firstName, lastName }: RegisterUserProps) {
    return new User({
      email,
      firstName,
      lastName,
    })
  }

  public get() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    }
  }
}
