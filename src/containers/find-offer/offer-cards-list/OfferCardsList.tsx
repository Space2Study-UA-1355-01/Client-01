import OfferCard, { OfferCardProps } from '~/components/offer-card/OfferCard'
import { styles } from '~/containers/find-offer/offer-cards-list/OfferCardsList.styles'
import { Box } from '@mui/material'

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

const OfferCardsList = () => {
  const mockOffers: OfferCardProps[] = [
    {
      price: 50,
      proficiencyLevel: 'Beginner',
      title: 'Sample Offer 1 for UX/UI Design',
      description: 'This is a description for UX/UI Design offer.',
      languages: ['English'],
      authorRole: 'student',
      author: {
        firstName: 'Ryan',
        lastName: 'Gosling',
        photo:
          'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQL8QrJGO7NfdJCBwsONox-rI1E3hKvrchgcSVCQQSWbm7VjV6A9lAo_qwvnJmn4CLFd7-T3qGjDP9Tor81xBItUQ',
        totalReviews: { student: 100, tutor: 0 },
        averageRating: { student: 5, tutor: 0 }
      },
      subject: { name: 'UX/UI Design' }
    },
    {
      price: 500,
      proficiencyLevel: 'Beginner',
      title: 'Sample Offer 1 for UX/UI Design',
      description: 'This is a description for UX/UI Design offer.',
      languages: ['English', 'Polish'],
      authorRole: 'tutor',
      author: {
        firstName: 'Emma',
        lastName: 'Stone',
        photo:
          'https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_FMjpg_UX1000_.jpg',
        totalReviews: { student: 0, tutor: 100 },
        averageRating: { student: 0, tutor: 3.5 }
      },
      subject: { name: 'UX/UI Design' }
    }
  ]

  return (
    <Box sx={styles.container}>
      {mockOffers.map((offer, index) => (
        <Box key={index}>
          <OfferCard {...offer} />
        </Box>
      ))}
    </Box>
  )
}

export default OfferCardsList
