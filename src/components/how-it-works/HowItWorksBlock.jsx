import { howItWorksCards } from '~/containers/student-home-page/student-how-it-works/HowItWorksCards'
import { HowItWorksStep } from './how-it-works-step/HowItWorksStep'
import { Box, Button } from '@mui/material'
import { styles } from './HowItWorksBlock.styles'
import TitleWithDescription from '../title-with-description/TitleWithDescription'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { useAppSelector } from '~/hooks/use-redux'
import { student } from '~/constants'

export const HowItWorksBlock = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const cards = howItWorksCards[userRole]

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t(`${userRole}HomePage.howItWorks.description`)}
        style={styles.titleWithDescription}
        title={t(`${userRole}HomePage.howItWorks.title`)}
      />
      <Box sx={styles.stepContainer}>
        {cards.map((card, index) => (
          <HowItWorksStep
            description={card.description}
            icon={card.image}
            key={index}
            title={card.title}
          />
        ))}
      </Box>
      <Button
        color='primary'
        component={Link}
        sx={styles.button}
        to={authRoutes.findOffers.path}
        variant='contained'
      >
        {userRole === student
          ? t(`studentHomePage.findTutorBlock.button`)
          : t(`tutorHomePage.findStudentBlock.button`)}
      </Button>
    </Box>
  )
}
