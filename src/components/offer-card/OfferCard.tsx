import { FC } from 'react'

import OfferCardRectangle from './offer-card-rectangle/OfferCardRectangle'
import OfferCardSquare from './offer-card-square/OfferCardSquare'

interface RatingInfo {
  student: number
  tutor: number
}

type AuthorRole = keyof RatingInfo

export interface OfferCardProps {
  price: number
  proficiencyLevel: string
  title: string
  description: string
  languages: string[]
  authorRole: AuthorRole
  author: {
    firstName: string
    lastName: string
    photo?: string

    totalReviews: RatingInfo
    averageRating: RatingInfo
  }
  subject: {
    name: string
  }
  onShowDetails?: () => void
  onSendMessage?: () => void
}

const isGridView = true

const OfferCard: FC<OfferCardProps> = (props) => {
  return isGridView ? (
    <OfferCardSquare {...props} />
  ) : (
    <OfferCardRectangle {...props} />
  )
}

export default OfferCard
