import { FC } from 'react'
import {
  Card,
  Box,
  Avatar,
  Typography,
  Chip,
  Button,
  IconButton,
  Stack
} from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
import LanguageIcon from '@mui/icons-material/Language'

// import UserAvatarIcon from '~/components/user-avatar-icon/UserAvatarIcon' // text on avatar if no url

import { styles } from '~/components/offer-card/offer-card-rectangle/OfferCardRectangle.styles'

const OfferCardRectangle: FC = () => (
  <Card sx={styles.card}>
    <Box sx={styles.container}>
      <Box sx={styles.leftSection}>
        <Avatar
          alt='Jennifer W.'
          src='profile-photo-url.jpg'
          sx={styles.avatar}
        />
        <Typography sx={styles.name}>Jennifer W.</Typography>
        <Box sx={styles.ratingBox}>
          {Array.from({ length: 4 }, (_, i) => (
            <StarIcon key={i} sx={styles.starIcon} />
          ))}
          <StarIcon sx={{ ...styles.starIcon, color: 'grey.300', mr: 0.5 }} />
          {/* mui rating component (accepts a number, can render .5 values) */}
          <Typography sx={styles.ratingText}>3.5</Typography>
        </Box>
        <Typography sx={styles.reviews}>10 reviews</Typography>
      </Box>
      <Box sx={styles.middleSection}>
        <Typography sx={styles.title}>
          Advanced Quantum Mechanics: Theoretical Concepts, Mathematical
          Formulations in Modern Physics
        </Typography>
        <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
          <Chip label='GERMAN' sx={styles.chip} />
          <Chip
            label='BEGINNER - ADVANCED'
            sx={{
              ...styles.chip,
              bgcolor: 'success.100',
              fontWeight: 400
            }}
          />
        </Stack>
        <Typography sx={styles.description}>
          Hello. There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable...
        </Typography>
        <Box sx={styles.languageBox}>
          <LanguageIcon sx={styles.languageIcon} />
          <Typography color='text.secondary' variant='body2'>
            Ukrainian, English
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.rightSection}>
        <Box sx={styles.priceBox}>
          <Box>
            <Typography sx={styles.price}>75 UAH</Typography>
            <Typography sx={styles.perHour}>/hour</Typography>
          </Box>
          <IconButton sx={{ ml: 1 }}>
            <BookmarkBorderIcon />
          </IconButton>
        </Box>
        <Button sx={styles.showDetailsButton} variant='contained'>
          Show details
        </Button>
        <Button sx={styles.sendMessageButton} variant='outlined'>
          Send message
        </Button>
      </Box>
    </Box>
  </Card>
)

export default OfferCardRectangle
