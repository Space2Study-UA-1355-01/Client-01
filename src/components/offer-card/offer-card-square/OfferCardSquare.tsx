import { FC, memo } from 'react'
import {
  Card,
  Box,
  Avatar,
  Typography,
  Chip,
  Button,
  IconButton
} from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
import LanguageIcon from '@mui/icons-material/Language'
import { styles } from './OfferCardSquare.styles'
import { OfferCardProps } from '../OfferCard'
import { useTranslation } from 'react-i18next'

const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName?.charAt(0).toUpperCase() || ''
  const lastInitial = lastName?.charAt(0).toUpperCase() || ''
  return `${firstInitial}${lastInitial}`
}

const OfferCardSquare: FC<OfferCardProps> = ({
  author: { photo, firstName, lastName, totalReviews, averageRating },
  price,
  proficiencyLevel,
  title,
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
      <Box sx={styles.topSection}>
        <Avatar alt={`${firstName} ${lastName}`} src={photo} sx={styles.avatar}>
          {!photo && getInitials(firstName, lastName)}
        </Avatar>
        <Box sx={styles.userInfo}>
          <Typography sx={styles.name}>
            {firstName} {lastName}
          </Typography>
          <Box sx={styles.languageRow}>
            <LanguageIcon sx={styles.languageIcon} />
            <Typography sx={styles.languageText}>
              {languages.join(', ')}
            </Typography>
          </Box>
        </Box>
        <IconButton sx={styles.bookmarkButton}>
          <BookmarkBorderIcon />
        </IconButton>
      </Box>

      <Typography sx={styles.title}>{title}</Typography>

      <Box sx={styles.divider} />

      <Box sx={styles.chipsRow}>
        <Typography sx={styles.label}>Subject:</Typography>
        <Chip label={subject?.toUpperCase() ?? ''} sx={styles.chip} />
      </Box>
      <Box sx={styles.chipsRow}>
        <Typography sx={styles.label}>Level:</Typography>
        <Chip
          label={proficiencyLevel.toUpperCase()}
          sx={{
            ...styles.chip,
            bgcolor: 'success.100',
            fontWeight: 400
          }}
        />
      </Box>

      <Box sx={styles.bottomRow}>
        <Box>
          <Typography sx={styles.price}>
            {price} {t('common.uah')}
          </Typography>
          <Typography sx={styles.perHour}>/hour</Typography>
        </Box>
        <Box sx={styles.ratingBox}>
          <Box sx={styles.ratingDetails}>
            <StarIcon sx={styles.starIcon} />
            <Typography sx={styles.ratingText}>
              {avgRating.toFixed(1)}
            </Typography>
          </Box>
          <Typography sx={styles.reviewsText}>
            {reviewsCount} reviews
          </Typography>
        </Box>
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
    </Card>
  )
}

export default memo(OfferCardSquare)
