import { useCallback, useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@mui/material'
import DefaultCategoryIcon from '@mui/icons-material/Category'

import { axiosClient } from '~/plugins/axiosClient'
import { PopularCategoryInterface } from '~/types/common/interfaces/common.interfaces'

import { CardWithLinkProps } from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import { CategoryIconsMap } from '~/components/category-card/Icons'

import { styles } from './PopularCategories.styles'

interface PopularCategoriesProps {
  limit?: number
}

const PopularCategories = ({ limit = 6 }: PopularCategoriesProps) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [cards, setCards] = useState<CardWithLinkProps[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const apiPath = import.meta.env.VITE_API_BASE_PATH
  const clientPath = 'http://localhost:3000'
  const selectedCategoryId = searchParams.get('id') || ''

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axiosClient.get<{
        data: PopularCategoryInterface[]
      }>(`${apiPath}/categories?limit=${limit}`)
      const data = res.data.data

      const transformed = data.map(
        (card: PopularCategoryInterface): CardWithLinkProps => {
          return {
            _id: card._id,
            name: card.name,
            icon: CategoryIconsMap[card.name] || DefaultCategoryIcon,
            description: `${card.totalOffers} Offers`,
            link: `${clientPath}/categories/subjects?categoryId=${card._id}`,
            appearance: card.appearance,
            totalOffers: card.totalOffers
          }
        }
      )

      setCards((prev) => {
        const newCards = selectedCategoryId
          ? transformed
          : [...prev, ...transformed]
        const uniqueCards = Array.from(
          new Map(newCards.map((card) => [card._id, card])).values()
        )
        return uniqueCards
      })
    } catch (error) {
      setError('Failed to load categories. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [selectedCategoryId, limit, apiPath])

  useEffect(() => {
    setCards([])
    void fetchCategories()
  }, [fetchCategories, selectedCategoryId])

  const sortedCards = [...cards].sort((a, b) => {
    const aOffers = a.totalOffers ?? 0
    const bOffers = b.totalOffers ?? 0
    return bOffers - aOffers
  })

  return (
    <Box sx={styles.container}>
      <Typography variant='h4'>
        {t('findOffers.popularCategories.title')}
      </Typography>
      <Typography sx={styles.description}>
        {t('findOffers.popularCategories.description')}
      </Typography>
      {error && <Typography color='error'>{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      <CardsList
        btnText={t('findOffers.popularCategories.viewAllCategories')}
        cards={sortedCards}
        onClick={() => navigate('/categories')}
      />
    </Box>
  )
}

export default PopularCategories
