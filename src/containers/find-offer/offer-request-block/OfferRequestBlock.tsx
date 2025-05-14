import { useTranslation } from 'react-i18next'

import { useAppSelector } from '~/hooks/use-redux'
import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'
import AppButton from '~/components/app-button/AppButton'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { translationKey } from '~/containers/find-offer/constants'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import CreateOfferOrRequestForm from '~/components/create-offer-or-request-form/CreateOfferOrRequestForm'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { userRole } = useAppSelector((state) => state.appMain) as {
    userRole: 'tutor' | 'student'
  }
  const { isOpen, openDrawer, closeDrawer } = useDrawer()

  const handleOpenDrawer = () => {
    openDrawer(true)
  }

  return (
    <>
      <TitleBlock img={icon} translationKey={translationKey}>
        <AppButton
          fullWidth={isMobile}
          onClick={handleOpenDrawer}
          sx={{ py: '14px' }}
        >
          {t(`${translationKey}.button.${userRole}`)}
        </AppButton>
      </TitleBlock>

      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <CreateOfferOrRequestForm onClose={closeDrawer} />
      </AppDrawer>
    </>
  )
}

export default OfferRequestBlock
