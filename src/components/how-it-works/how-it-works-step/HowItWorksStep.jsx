import { useTranslation } from 'react-i18next'
import IconTitleDescription from '../../icon-title-description/IconTitleDescription'
import { styles } from './HowItWorksStep.styles'
import { Box } from '@mui/material'

export const HowItWorksStep = ({ icon: image, title, description }) => {
  const { t } = useTranslation()

  return (
    <IconTitleDescription
      description={t(description)}
      icon={<Box alt={`step-${title}`} component='img' src={image} />}
      sx={styles}
      title={t(title)}
    />
  )
}
