import OfferCard from '~/components/offer-card/OfferCard'
import { styles } from '~/containers/find-offer/offer-cards-list/OfferCardsList.styles'
import { Box } from '@mui/material'

const OfferCardsList = () => {
  const mockOffers = Array.from({ length: 5 })

  return (
    <Box sx={styles.container}>
      {mockOffers.map((_, index) => (
        <Box key={index}>
          <OfferCard />
        </Box>
      ))}
    </Box>
  )
}

export default OfferCardsList
