import moment from 'moment'
import { Entity, Column, PrimaryColumn } from 'typeorm'
import { TAccessTokenAudience } from 'types/Types'
import { decodeJwt } from '../services/AuthHelper'

interface RefreshtokenProps {
  id: string
  userId: number
  exp: Date
  iat: Date
  aud: TAccessTokenAudience
}

type TCreateFromTokenReturn = Promise<RefreshToken>

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryColumn({ name: 'id' })
  private id: string

  @Column({ name: 'user_id' })
  private userId: number

  @Column({ name: 'exp' })
  private exp: Date

  @Column({ name: 'iat' })
  private iat: Date

  @Column({ name: 'aud' })
  private aud: TAccessTokenAudience

  @Column({ name: 'is_used' })
  private isUsed: boolean

  private constructor(props?: RefreshtokenProps) {
    if (props !== undefined) {
      this.id = props.id
      this.userId = props.userId
      this.exp = props.exp
      this.iat = props.iat
      this.aud = props.aud
      this.isUsed = false
    }
  }

  public static create = (props: RefreshtokenProps) => {
    return new RefreshToken(props)
  }

  public static createFromToken = async (
    token: string,
  ): TCreateFromTokenReturn => {
    const decoded = await decodeJwt(token)
    if (!decoded) return Promise.reject('invalid token')

    const { exp, iat, jti, userId, accessTokenAudience } = decoded

    return new RefreshToken({
      id: jti,
      userId: userId,
      exp: moment.unix(exp).toDate(),
      iat: moment.unix(iat).toDate(),
      aud: accessTokenAudience,
    })
  }

  public get() {
    return {
      id: this.id,
      userId: this.userId,
      exp: this.exp,
      iat: this.iat,
      aud: this.aud,
      isUsed: this.isUsed,
    }
  }

  public setIsUsed() {
    this.isUsed = true
  }
}
