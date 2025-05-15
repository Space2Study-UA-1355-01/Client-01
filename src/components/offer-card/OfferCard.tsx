import { FC } from 'react'
import { useMediaQuery } from '@mui/material'

import OfferCardRectangle from './offer-card-rectangle/OfferCardRectangle'
import OfferCardSquare from './offer-card-square/OfferCardSquare'

interface RatingInfo {
  student: number
  tutor: number
}

export type AuthorRole = keyof RatingInfo

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
  subject: string
  onShowDetails?: () => void
  onSendMessage?: () => void
}

const OfferCard: FC<OfferCardProps & { isGridView: boolean }> = ({
  isGridView,
  ...props
}) => {
  const isLargeScreen = useMediaQuery('(min-width: 730px)')
  if (isGridView || !isLargeScreen) {
    return <OfferCardSquare {...props} />
  } else {
    return <OfferCardRectangle {...props} />
  }
}

export default OfferCard
