import { FC, useContext } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import { useModalContext } from '~/context/modal-context'
import useConfirm from '~/hooks/use-confirm'
import { UserRoleEnum } from '~/types'
import { useTranslation } from 'react-i18next'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'
import { ConfirmationDialogContext } from '~/context/confirm-context'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps?: PaperProps
  timerId?: NodeJS.Timeout | null
  defaultRole?: UserRoleEnum | null
  closeModal: () => void
  closeModalAfterDelay: () => void
  isFullScreen?: boolean
  setFullScreen?: (value: boolean) => void
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModal,
  closeModalAfterDelay,
  isFullScreen
}) => {
  const { isMobile } = useBreakpoints()
  const { openDialog } = useContext(ConfirmationDialogContext)
  const { unsavedChanges } = useModalContext()
  const { setNeedConfirmation } = useConfirm()
  const { t } = useTranslation()

  const handleClose = () => {
    if (unsavedChanges) {
      openDialog({
        title: t('confirmationWindow.confirmation'),
        message: t('confirmationWindow.unsavedChanges'),
        sendConfirm: (confirmed) => {
          if (confirmed) closeModal()
          setNeedConfirmation(false)
        }
      })
    } else {
      closeModal()
      setNeedConfirmation(false)
    }
  }

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isFullScreen ?? isMobile}
      maxWidth='xl'
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={handleClose} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
