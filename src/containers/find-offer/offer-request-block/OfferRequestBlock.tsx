import { useTranslation } from 'react-i18next'

import { useAppSelector } from '~/hooks/use-redux'
import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'
import AppButton from '~/components/app-button/AppButton'
import useBreakpoints from '~/hooks/use-breakpoints'
//import { useDrawer } from '~/hooks/use-drawer'
import { translationKey } from '~/containers/find-offer/constants'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  //const { openDrawer } = useDrawer()
  const { userRole } = useAppSelector((state) => state.appMain) as {
    userRole: 'tutor' | 'student'
  }

  //placeholder until the "Create request/offer" modal is ready
  const handleOpenDrawer = () => {
    //openDrawer()
    alert('Modal is not implement yet')
  }

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <AppButton
        fullWidth={isMobile}
        onClick={handleOpenDrawer}
        sx={{ py: '14px' }}
      >
        {t(`${translationKey}.button.${userRole}`)}
      </AppButton>
    </TitleBlock>
  )
}

export default OfferRequestBlock
