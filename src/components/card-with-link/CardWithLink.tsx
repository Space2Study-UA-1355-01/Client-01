import { FC } from 'react'
import Box from '@mui/material/Box'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/card-with-link/CardWithLink.styles'
import { CategoryAppearance } from '~/types'

export interface CardWithLinkProps {
  _id: string
  icon: React.ElementType
  appearance: CategoryAppearance
  name: string
  description?: string
  link?: string
  totalOffers?: number
}

const CardWithLink: FC<CardWithLinkProps> = ({
  icon,
  name,
  description,
  link,
  appearance
}) => {
  const IconComponent = icon
  return (
    <AppCard link={link}>
      <Box
        sx={{
          ...styles.img,
          backgroundColor: appearance.color
        }}
      >
        <IconComponent
          sx={{ width: '32px', height: '32px', color: appearance.icon }}
        />
      </Box>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={name}
      />
    </AppCard>
  )
}

export default CardWithLink
