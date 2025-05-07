import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import { IconButtonProps } from '@mui/material/IconButton'
import UserAvatarIcon from '~/components/user-avatar-icon/UserAvatarIcon'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

type ButtonProps = (props: {
  openLoginDialog?: () => void
  openMenu?: () => void
  setSidebarOpen?: () => void
  openNotifications?: () => void
  changeLanguage?: () => void
}) => IconButtonProps

type BadgeContent = (props: { notifications: number }) => number

interface NavigationIconButton {
  disabled?: boolean
  tooltip: string
  icon: React.ReactElement
  buttonProps: ButtonProps
  badgeContent?: BadgeContent
}

const languageIcon: NavigationIconButton = {
  disabled: false,
  tooltip: 'iconsTooltip.language',
  icon: <LanguageIcon />,
  buttonProps: ({ changeLanguage }) => ({
    onClick: changeLanguage,
    sx: styles.studentIcons
  })
}

const menuIcon: NavigationIconButton = {
  tooltip: 'iconsTooltip.menu',
  icon: <MenuIcon />,
  buttonProps: ({ setSidebarOpen }) => ({
    onClick: setSidebarOpen,
    sx: styles.showOnlyOnMobile
  })
}

export const guestIcons: NavigationIconButton[] = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.login',
    icon: <LoginIcon />,
    buttonProps: ({ openLoginDialog }) => ({
      onClick: openLoginDialog,
      sx: styles.showOnlyOnMobile
    })
  },
  menuIcon
]

export const userIcons: NavigationIconButton[] = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.account',
    icon: <UserAvatarIcon />,
    buttonProps: ({ openMenu }) => ({
      onClick: openMenu,
      sx: styles.studentIcons
    })
  },
  menuIcon
]
