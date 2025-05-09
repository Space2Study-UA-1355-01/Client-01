import { useTranslation } from 'react-i18next'
import IconTitleDescription from '../../icon-title-description/IconTitleDescription'
import { styles } from './HotItWorksStep.styles'

export const HowItWorksStep = ({ icon, title, description }) => {
  const { t } = useTranslation()

  return (
    <IconTitleDescription
      description={t(description)}
      icon={icon}
      sx={styles}
      title={t(title)}
    />
  )
}
