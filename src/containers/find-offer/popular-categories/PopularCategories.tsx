import { CardWithLinkProps } from '~/components/card-with-link/CardWithLink'
import { Typography, Box } from '@mui/material'
import CardsList from '~/components/cards-list/CardsList'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { CategoryInterface } from '~/types/common/interfaces/common.interfaces'
import { axiosClient } from '~/plugins/axiosClient'
import { CategoryIconsMap } from '~/components/category-card/Icons'
import DefaultCategoryIcon from '@mui/icons-material/Category'

//import { styles } from '~/containers/find-offer/popular-categories/PopularCategories.styles'

const apiPath = import.meta.env.VITE_API_BASE_PATH
const clientPath = 'http://localhost:3000'

interface PopularCategoriesProps {
  limit?: number
}

export const PopularCategories = ({ limit = 6 }: PopularCategoriesProps) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const selectedCategoryId = searchParams.get('id') || ''
  const [cards, setCards] = useState<CardWithLinkProps[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let data: CategoryInterface[] = []
      const res = await axiosClient.get<{
        data: CategoryInterface[]
      }>(`${apiPath}/categories?limit=${limit}`)
      data = res.data.data

      const transformed = data.map(
        (card: CategoryInterface): CardWithLinkProps => ({
          _id: card._id,
          name: card.name,
          icon: CategoryIconsMap[card.name] || DefaultCategoryIcon,
          description: `${Number(card.totalOffers)} Offers`,
          link: `${clientPath}/categories/subjects?categoryId=${card._id}`,
          appearance: card.appearance
        })
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
      console.error('Failed to fetch categories:', error)
      setError('Failed to load categories. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [selectedCategoryId, limit])

  useEffect(() => {
    setCards([])
    void fetchCategories()
  }, [fetchCategories, selectedCategoryId])

  return (
    <Box>
      <Typography variant='h4'>
        {t('findOffers.popularCategories.title')}
      </Typography>
      <Typography>{t('findOffers.popularCategories.description')}</Typography>
      {error && <Typography color='error'>{error}</Typography>}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : cards.length === 0 ? (
        <Typography>No categories available.</Typography>
      ) : (
        <CardsList
          btnText={t('findOffers.popularCategories.viewAllCategories')}
          cards={cards}
          onClick={() => navigate('/categories')}
        />
      )}
    </Box>
  )
}
