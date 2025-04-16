import { FC, useContext } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'
import { ConfirmationDialogContext } from '~/context/confirm-context'
import { useModalContext } from '~/context/modal-context'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
  closeModal: () => void
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay,
  closeModal
}) => {
  const { isMobile } = useBreakpoints()
  const { openDialog } = useContext(ConfirmationDialogContext)
  const { unsavedChanges } = useModalContext()

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  const handleCloseClick = () => {
    if (unsavedChanges) {
      openDialog({
        title: 'test',
        message: 'test',
        sendConfirm: (confirmed) => {
          if (confirmed) closeModal()
        }
      })
    } else {
      closeModal()
    }
  }

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton sx={styles.icon}>
          <CloseIcon onClick={handleCloseClick} />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
