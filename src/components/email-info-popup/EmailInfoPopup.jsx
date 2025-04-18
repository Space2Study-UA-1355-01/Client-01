import { Dialog, DialogContent, IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

import ImgTitleDescription from '../img-title-description/ImgTitleDescription'
import imgInfo from '~/assets/img/guest-home-page/info.svg'
import { styles } from './EmailInfoPopup.styles'

const EmailInfoPopup = ({ open, onClose, email }) => {
  const { t } = useTranslation()

  return (
    <Dialog
      PaperProps={{
        sx: styles.dialogPaper
      }}
      fullWidth
      maxWidth={false}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') {
          onClose()
        }
      }}
      open={open}
      sx={{
        '& .MuiDialog-container': {
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
    >
      <DialogContent>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>

        <ImgTitleDescription
          description={
            <>
              {t('signup.confirmEmailMessage')}
              <strong>{email}</strong>
              {t('signup.confirmEmailDesc')}
            </>
          }
          img={imgInfo}
          title={t('signup.confirmEmailTitle')}
        />

        <Button onClick={onClose} sx={styles.confirmButton} variant='contained'>
          OK
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default EmailInfoPopup
