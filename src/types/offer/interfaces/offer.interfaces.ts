import { ButtonProps } from '@mui/material/Button'
import {
  ProficiencyLevelEnum,
  CommonEntityFields,
  UserResponse,
  LanguagesEnum,
  Faq,
  UserRoleEnum,
  StatusEnum
} from '~/types'

export interface Offer extends CommonEntityFields {
  title: string
  price: number
  proficiencyLevel: ProficiencyLevelEnum
  description: string
  languages: LanguagesEnum[]
  enrolledUsers: string[]
  authorRole: UserRoleEnum
  author: Pick<
    UserResponse,
    | '_id'
    | 'firstName'
    | 'lastName'
    | 'photo'
    | 'professionalSummary'
    | 'nativeLanguage'
    | 'totalReviews'
    | 'averageRating'
  >
  subject: string
  subjectName: string
  category: string
  FAQ: Faq[]
  status: StatusEnum
}

export interface ButtonActions {
  label: string
  buttonProps?: ButtonProps<'button', { to?: string }>
}

export interface PriceRangeParams {
  authorRole: UserRoleEnum
  categoryId?: string
  subjectId?: string
}

export interface PriceRangeResponse {
  minPrice: number
  maxPrice: number
}

export interface GetOffersResponse {
  items: Offer[]
  count: number
}
