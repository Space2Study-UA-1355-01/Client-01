import { useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindBlock from '~/components/find-block/FindBlock'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { translationKey } from '~/components/find-block/find-student-constants'
import { HowItWorksBlock } from '~/components/how-it-works/HowItWorksBlock'
import { Container, Stack } from '@mui/material'

import Faq from '~/containers/student-home-page/faq/Faq'

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
        <HowItWorksBlock />
        <Faq />
      </Stack>
    </Container>
  )
}

export default TutorHome
