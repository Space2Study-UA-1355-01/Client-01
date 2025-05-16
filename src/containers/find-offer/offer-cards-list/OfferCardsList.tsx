import { useEffect, useState } from 'react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Box, Stack, Pagination } from '@mui/material'
import usePagination from '~/hooks/table/use-pagination'
import { itemsLoadLimit } from '~/constants/index'

import OfferCard from '~/components/offer-card/OfferCard'
import { styles } from '~/containers/find-offer/offer-cards-list/OfferCardsList.styles'
import { ErrorResponse, Offer } from '~/types'
import { mapOfferToCardProps } from '~/utils/mapOfferToCardProps'
import Loader from '~/components/loader/Loader'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

interface OfferCardsListProps {
  offers: Offer[]
  isGridView: boolean
  loading: boolean
  error: ErrorResponse | null
}

const OfferCardsList: FC<OfferCardsListProps> = ({
  offers,
  isGridView,
  loading,
  error
}) => {
  const { t } = useTranslation()

  const getItemsPerPage = () => {
    const width = window.innerWidth
    if (width < 900) return itemsLoadLimit.mobile
    if (width < 1100) return itemsLoadLimit.tablet
    return itemsLoadLimit.default
  }
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage)
  const { page, rowsPerPage, pageCount, handleChangePage } = usePagination({
    itemsCount: offers.length,
    itemsPerPage,
    defaultPage: 1
  })
  const startIndex = (page - 1) * rowsPerPage
  const paginatedOffers = offers.slice(startIndex, startIndex + rowsPerPage)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading) {
    return (
      <Box>
        <Loader pageLoad size={50} />
      </Box>
    )
  }

  if (error) {
    return (
      <NotFoundResults
        buttonText={t('errorMessages.fetchingErrorButtonText')}
        description={t('errorMessages.fetchingError')}
        onClick={() => window.location.reload()}
      />
    )
  }
  if (!offers.length) {
    return (
      <NotFoundResults
        buttonText={t('errorMessages.buttonRequest', {
          name: t('errorMessages.offers')
        })}
        description={t('errorMessages.tryAgainText', {
          name: t('errorMessages.offers')
        })}
        onClick={() => console.log('Open new offer Form')}
      />
    )
  }

  return (
    <Box>
      {isGridView ? (
        <Grid container spacing={2}>
          {paginatedOffers.map((offer) => (
            <Grid item key={offer._id} lg={4} md={6} xs={12}>
              <Box sx={styles.container}>
                <OfferCard
                  isGridView={isGridView}
                  {...mapOfferToCardProps(offer)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={2}>
          {paginatedOffers.map((offer) => (
            <Box key={offer._id} sx={styles.container}>
              <OfferCard
                isGridView={isGridView}
                {...mapOfferToCardProps(offer)}
              />
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
