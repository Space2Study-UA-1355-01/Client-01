import { FC } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'
import { useModalContext } from '~/context/modal-context'
import { UserRoleEnum } from '~/types'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId?: NodeJS.Timeout | null
  onClose: () => void
  defaultRole?: UserRoleEnum | null
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  onClose
}) => {
  const { isMobile } = useBreakpoints()
  const { closeModal } = useModalContext()

  const handleClose = () => {
    onClose()
    closeModal()
  }

  const closeModalAfterDelay = (delay = 0) => {
    setTimeout(() => {
      handleClose()
    }, delay)
  }

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      onClose={handleClose}
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
