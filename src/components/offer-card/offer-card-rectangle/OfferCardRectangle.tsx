import { FC, memo } from 'react'
import {
  Card,
  Box,
  Avatar,
  Typography,
  Chip,
  Button,
  IconButton,
  Stack,
  Rating
} from '@mui/material'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
import LanguageIcon from '@mui/icons-material/Language'

import { styles } from './OfferCardRectangle.styles'
import { OfferCardProps } from '../OfferCard'
import { useTranslation } from 'react-i18next'

const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName?.charAt(0).toUpperCase() || ''
  const lastInitial = lastName?.charAt(0).toUpperCase() || ''
  return `${firstInitial}${lastInitial}`
}

const OfferCardRectangle: FC<OfferCardProps> = ({
  author: { photo, firstName, lastName, totalReviews, averageRating },
  price,
  proficiencyLevel,
  title,
  description,
  languages,
  authorRole,
  subject,
  onShowDetails,
  onSendMessage
}) => {
  const { t } = useTranslation()
  const reviewsCount = totalReviews[authorRole] ?? 0
  const avgRating = averageRating[authorRole] ?? 0

  return (
    <Card sx={styles.card}>
      <Box sx={styles.container}>
        <Box sx={styles.leftSection}>
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={photo}
            sx={styles.avatar}
          >
            {!photo && getInitials(firstName, lastName)}
          </Avatar>

          <Typography sx={styles.name}>
            {firstName} {lastName.at(0)}.
          </Typography>
          <Box sx={styles.ratingBox}>
            <Rating
              emptyIcon={
                <StarIcon fontSize='inherit' sx={{ color: 'grey.300' }} />
              }
              icon={<StarIcon fontSize='inherit' />}
              name='read-only-rating'
              precision={0.5}
              readOnly
              sx={{ mr: 0.5 }}
              value={avgRating}
            />
            <Typography sx={styles.ratingText}>{avgRating}</Typography>
          </Box>
          <Typography sx={styles.reviews}>{reviewsCount} reviews</Typography>
        </Box>
        <Box sx={styles.middleSection}>
          <Typography sx={styles.title}>{title}</Typography>
          <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
            <Chip label={subject?.toUpperCase() ?? ''} sx={styles.chip} />
            <Chip
              label={proficiencyLevel.toUpperCase()}
              sx={{
                ...styles.chip,
                bgcolor: 'success.100',
                fontWeight: 400
              }}
            />
          </Stack>
          <Typography sx={styles.description}>{description}</Typography>
          <Box sx={styles.languageBox}>
            <LanguageIcon sx={styles.languageIcon} />
            <Typography color='text.secondary' variant='body2'>
              {languages.join(', ')}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.rightSection}>
          <Box sx={styles.priceBox}>
            <Box>
              <Typography sx={styles.price}>
                {price} {t('common.uah')}
              </Typography>
              <Typography sx={styles.perHour}>/{t('common.hour')}</Typography>
            </Box>
            <IconButton sx={{ ml: 1 }}>
              <BookmarkBorderIcon />
            </IconButton>
          </Box>
          <Button
            onClick={onShowDetails}
            sx={styles.showDetailsButton}
            variant='contained'
          >
            {t('common.labels.viewDetails')}
          </Button>
          <Button
            onClick={onSendMessage}
            sx={styles.sendMessageButton}
            variant='outlined'
          >
            {t('common.labels.sendMessage')}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default memo(OfferCardRectangle)
