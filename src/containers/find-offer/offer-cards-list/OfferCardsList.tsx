import { Grid, Box, Stack } from '@mui/material'
import OfferCard from '~/components/offer-card/OfferCard'
import { styles } from '~/containers/find-offer/offer-cards-list/OfferCardsList.styles'
import { AuthorRole } from '~/components/offer-card/OfferCard'

interface ViewSwitcherProps {
  isGridView: boolean
}

const OfferCardsList = ({ isGridView }: ViewSwitcherProps) => {
  const mockOffers = Array.from({ length: 5 })

  const offerData = {
    price: 100,
    proficiencyLevel: 'Beginner',
    title: 'Offer Title',
    description: 'This is a description of the offer.',
    languages: ['English', 'Spanish'],
    authorRole: 'student' as AuthorRole,
    author: {
      firstName: 'John',
      lastName: 'Doe',
      photo: '',
      totalReviews: { student: 10, tutor: 5 },
      averageRating: { student: 4.5, tutor: 4.2 }
    },
    subject: { name: 'Mathematics' },
    onShowDetails: () => console.log('View details clicked'),
    onSendMessage: () => console.log('Send message clicked')
  }

  return (
    <Box>
      {isGridView ? (
        <Grid container spacing={2}>
          {mockOffers.map((_, index) => (
            <Grid item key={index} md={4} sm={6} xs={12}>
              <Box sx={styles.container}>
                <OfferCard {...offerData} isGridView={isGridView} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={2}>
          {mockOffers.map((_, index) => (
            <Box key={index} sx={styles.container}>
              <OfferCard {...offerData} isGridView={isGridView} />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export default OfferCardsList
