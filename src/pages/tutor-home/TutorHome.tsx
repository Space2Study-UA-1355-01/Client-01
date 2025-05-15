import { useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import { Container, Stack } from '@mui/material'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindBlock from '~/components/find-block/FindBlock'

import { translationKey } from '~/components/find-block/find-student-constants'
import { HowItWorksBlock } from '~/components/how-it-works/HowItWorksBlock'

import Faq from '~/containers/student-home-page/faq/Faq'
import PopularCategories from '~/containers/find-offer/popular-categories/PopularCategories'

import { styles } from './TutorHome.styles'

const TutorHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <Container data-testid='tutorHome' sx={{ flex: 1, pt: '80px' }}>
      <Stack spacing='80px'>
        <FindBlock translationKey={translationKey} />
        <PopularCategories limit={6} />
        <HowItWorksBlock />
        <Faq />
      </Stack>
    </Container>
  )
}

export default TutorHome
