import { FC } from 'react'

import OfferCardRectangle from './offer-card-rectangle/OfferCardRectangle'
// import OfferCardSquare from './offer-card-square/OfferCardSquare'

interface RatingInfo {
  student: number
  tutor: number
}

interface OfferCardProps {
  price: number // 1
  proficiencyLevel: string // 2
  title: string // 3
  description: string // 4
  languages: string[] // 5; приходить масив навіть із 1 значенням
  authorRole: string // витягнути в змінну? аби totalReviews[authorRole] and averageRating[authorRole] (динамічно відобразити)
  author: {
    firstName: string // 6
    lastName: string // 7
    photo: string

    totalReviews: RatingInfo // 8
    averageRating: RatingInfo // 9
  } // приходить обєкт
  subject: {
    name: string // german
  }
  onShowDetails?: () => void
  onSendMessage?: () => void
}

/*
{
    "_id": "681c9bdda9db8236f971b34d",
    "price": 50,
    "proficiencyLevel": "Beginner",
    "title": "Sample Offer 1 for UX/UI Design",
    "description": "This is a description for UX/UI Design offer.",
    "languages": [
        "English"
    ],
    "authorRole": "student",
    "author": {
        "_id": "680648277844011b957034ff",
        "firstName": "kekekek",
        "lastName": "kekekek",
        "photo": "https:/./././"
        "totalReviews": {
            "student": 0,
            "tutor": 0
        },
        "averageRating": {
            "student": 0,
            "tutor": 0
        }
    },
    "category": {
        "_id": "681c9bdda9db8236f971b31e",
        "appearance": {
            "icon": "#bc9d06",
            "color": "#d8cb8d"
        }
    },
    "subject": {
        "_id": "681c9bdda9db8236f971b32e",
        "name": "UX/UI Design"
    },
    "status": "active",
    "FAQ": [
        {
            "question": "What is included?",
            "answer": "The offer includes full support for the subject.",
            "_id": "681c9bdda9db8236f971b34e"
        },
        {
            "question": "Who is it for?",
            "answer": "It is for students of all levels.",
            "_id": "681c9bdda9db8236f971b34f"
        }
    ],
    "createdAt": "2025-05-08T11:56:13.474Z",
    "updatedAt": "2025-05-08T11:56:13.474Z"
}
 */

const OfferCard: FC<OfferCardProps> = () => <OfferCardRectangle />

export default OfferCard
