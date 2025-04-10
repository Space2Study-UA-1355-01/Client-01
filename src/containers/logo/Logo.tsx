import { FC } from 'react'
import logo from '~/assets/logo.svg'
import logoLight from '~/assets/logo-light.svg'
import Box, { BoxProps } from '@mui/material/Box'
import { ComponentEnum } from '~/types'

interface LogoProps extends BoxProps {
  light?: boolean
}

const Logo: FC<LogoProps> = ({ light = false, ...props }) => {
  const handleClick = () => {
    const welcomeSection = document.getElementById('welcome')
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box
      alt='logo'
      component={ComponentEnum.Img}
      onClick={handleClick}
      src={light ? logoLight : logo}
      sx={{ cursor: 'pointer' }}
      {...props}
    />
  )
}

export default Logo
