import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import InfoCard from '~/components/info-card/InfoCard'
import { guestRoutes } from '~/router/constants/guestRoutes'
import learnImg from '~/assets/img/guest-home-page/learnImg.png'
import teachImg from '~/assets/img/guest-home-page/teachImg.png'
import { UserRoleEnum } from '~/types'
import { styles } from '~/containers/guest-home-page/styles/WhatCanYouDo.styles'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import RegistrationDialog from './registration-dialog/RegistrationDialog'

const cardData = [
  {
    img: learnImg,
    title: 'guestHomePage.whatCanYouDo.learn.title',
    description: 'guestHomePage.whatCanYouDo.learn.description',
    actionLabel: 'guestHomePage.whatCanYouDo.learn.actionLabel',
    actionType: UserRoleEnum.Student
  },
  {
    img: teachImg,
    title: 'guestHomePage.whatCanYouDo.teach.title',
    description: 'guestHomePage.whatCanYouDo.teach.description',
    actionLabel: 'guestHomePage.whatCanYouDo.teach.actionLabel',
    actionType: UserRoleEnum.Tutor
  }
]

const WhatCanYouDo = () => {
  const { t } = useTranslation()
  const [openLoginDialog, setOpenLoginDialog] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRoleEnum | null>(null)

  const openDialogWithRole = (role: UserRoleEnum) => {
    setSelectedRole(role)
    setOpenLoginDialog(true)
  }

  const toggleDialog = () => {
    setOpenLoginDialog((prev) => !prev)
    if (openLoginDialog) {
      setSelectedRole(null) // Clear role when closing
    }
  }

  const cards = cardData.map((item) => (
    <InfoCard
      action={() => openDialogWithRole(item.actionType)} // Fixed to set role and open dialog
      actionLabel={t(item.actionLabel)}
      cardWidth={460}
      description={t(item.description)}
      img={item.img}
      key={item.title}
      title={t(item.title)}
    />
  ))

  return (
    <Box id={guestRoutes.navBar.whatCanYouDo.route}>
      <TitleWithDescription
        description={t('guestHomePage.whatCanYouDo.description')}
        style={styles.titleWithDescription}
        title={t('guestHomePage.whatCanYouDo.title')}
      />
      <Box sx={styles.cards}>{cards}</Box>
      {openLoginDialog && selectedRole && (
        <PopupDialog
          content={<RegistrationDialog defaultRole={selectedRole} />}
          onClose={toggleDialog}
          paperProps={{ sx: { maxWidth: 960 } }}
        />
      )}
    </Box>
  )
}

export default WhatCanYouDo
