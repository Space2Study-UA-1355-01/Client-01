import { useEffect } from 'react'
import Container from '@mui/material/Container'
import { Stack } from '@mui/material'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import Faq from '~/containers/student-home-page/faq/Faq'
import PopularCategories from '~/containers/find-offer/popular-categories/PopularCategories'

import { translationKey } from '~/components/find-block/find-tutor-constants'
import { HowItWorksBlock } from '~/components/how-it-works/HowItWorksBlock'

const StudentHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <Container data-testid='studentHome' sx={{ flex: 1, pt: '80px' }}>
      <Stack spacing='80px'>
        <FindBlock translationKey={translationKey} />
        <PopularCategories limit={6} />
        <HowItWorksBlock />
        <Faq />
      </Stack>
    </Container>
  )
}

export default StudentHome
