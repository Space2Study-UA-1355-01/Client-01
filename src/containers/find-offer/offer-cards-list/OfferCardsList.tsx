import { Grid, Box, Stack } from '@mui/material'
import OfferCard from '~/components/offer-card/OfferCard'
import { styles } from '~/containers/find-offer/offer-cards-list/OfferCardsList.styles'

interface ViewSwitcherProps {
  isGridView: boolean
}

const OfferCardsList = ({ isGridView }: ViewSwitcherProps) => {
  const mockOffers = Array.from({ length: 5 })

  return (
    <Box>
      {isGridView ? (
        <Grid container spacing={2}>
          {mockOffers.map((_, index) => (
            <Grid item key={index} md={4} sm={6} xs={12}>
              <Box sx={{ ...styles.container, ...styles.gridView }}>
                <OfferCard />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={2}>
          {mockOffers.map((_, index) => (
            <Box key={index} sx={{ ...styles.container, ...styles.inlineView }}>
              <OfferCard />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export default OfferCardsList
