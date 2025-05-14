import { Grid, Box, Stack, Pagination } from '@mui/material'

import usePagination from '~/hooks/table/use-pagination'

import OfferCard from '~/components/offer-card/OfferCard'
import { styles } from '~/containers/find-offer/offer-cards-list/OfferCardsList.styles'
import { AuthorRole } from '~/components/offer-card/OfferCard'

interface ViewSwitcherProps {
  isGridView: boolean
}

const OfferCardsList = ({ isGridView }: ViewSwitcherProps) => {
  const mockOffers = Array.from({ length: 7 })
  const { page, rowsPerPage, pageCount, handleChangePage } = usePagination({
    itemsCount: mockOffers.length,
    itemsPerPage: 6,
    defaultPage: 1
  })

  const startIndex = (page - 1) * rowsPerPage
  const paginatedOffers = mockOffers.slice(startIndex, startIndex + rowsPerPage)

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
          {paginatedOffers.map((_, index) => (
            <Grid item key={index} md={4} sm={6} xs={12}>
              <Box sx={styles.container}>
                <OfferCard {...offerData} isGridView={isGridView} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={2}>
          {paginatedOffers.map((_, index) => (
            <Box key={index} sx={styles.container}>
              <OfferCard {...offerData} isGridView={isGridView} />
            </Box>
          ))}
        </Stack>
      )}
      <Box display='flex' justifyContent='center' mt={4}>
        <Pagination
          color='primary'
          count={pageCount}
          onChange={handleChangePage}
          page={page}
        />
      </Box>
    </Box>
  )
}

export default OfferCardsList
