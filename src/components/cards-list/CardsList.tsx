import { FC } from 'react'
import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import Loader from '~/components/loader/Loader'

import { styles } from '~/components/cards-list/CardsList.styles'
import { SizeEnum, ButtonVariantEnum } from '~/types'
import CardWithLink, {
  CardWithLinkProps
} from '~/components/card-with-link/CardWithLink'

interface CardsListProps {
  btnText: string
  cards: CardWithLinkProps[]
  isExpandable?: boolean
  loading?: boolean
  onClick: () => void
}

const CardsList: FC<CardsListProps> = ({
  btnText,
  cards,
  isExpandable = true,
  loading,
  onClick
}) => {
  return (
    <Box>
      {loading && !cards.length ? (
        <Box sx={styles.loaderContainer}>
          <Loader pageLoad size={50} />
        </Box>
      ) : (
        <Box sx={styles.cardsContainer}>
          {cards.map((card) => (
            <CardWithLink key={card._id} {...card} />
          ))}
        </Box>
      )}

      {isExpandable && (
        <AppButton
          loading={loading}
          onClick={onClick}
          size={SizeEnum.ExtraLarge}
          sx={styles.btn}
          variant={ButtonVariantEnum.Tonal}
        >
          {btnText}
        </AppButton>
      )}
    </Box>
  )
}
export default CardsList
