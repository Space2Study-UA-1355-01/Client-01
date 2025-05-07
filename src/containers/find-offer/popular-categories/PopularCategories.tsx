import { CardWithLinkProps } from '~/components/card-with-link/CardWithLink'
import { Typography, Box } from '@mui/material'
import CardsList from '~/components/cards-list/CardsList'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const mockCards: CardWithLinkProps[] = [
  {
    _id: '1',
    img: '/icons/languages.svg',
    title: 'Languages',
    description: '234 Offers'
  },
  {
    _id: '2',
    img: '/icons/mathematics.svg',
    title: 'Mathematics',
    description: '234 Offers'
  },
  {
    _id: '3',
    img: '/icons/computer-science.svg',
    title: 'Computer science',
    description: '234 Offers'
  },
  {
    _id: '4',
    img: '/icons/music.svg',
    title: 'Music',
    description: '234 Offers'
  },
  {
    _id: '5',
    img: '/icons/design.svg',
    title: 'Design',
    description: '234 Offers'
  },
  {
    _id: '6',
    img: '/icons/history.svg',
    title: 'History',
    description: '234 Offers'
  }
]

export const PopularCategories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box>
      <Typography variant='h4'>
        {t('findOffers.popularCategories.title')}
      </Typography>
      <CardsList
        btnText={t('findOffers.popularCategories.viewAllCategories')}
        cards={mockCards}
        onClick={() => navigate('/categories')}
      />
    </Box>
  )
}
