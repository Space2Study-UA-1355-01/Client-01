import { useEffect, useState, FC } from 'react'
import Avatar from '@mui/material/Avatar'
import { useAppSelector } from '~/hooks/use-redux'

const UserAvatarIcon: FC = () => {
  const { firstName, lastName, photo } = useAppSelector(
    (state) => state.appMain
  )
  const [initials, setInitials] = useState('')
  useEffect(() => {
    const first = firstName?.[0] || ''
    const last = lastName?.[0] || ''
    setInitials((first + last).toUpperCase())
  }, [firstName, lastName])

  return (
    <Avatar
      alt={`${firstName} ${lastName}`}
      data-testid='AvatarIcon'
      src={photo}
      sx={{ width: 40, height: 40 }}
    >
      {initials}
    </Avatar>
  )
}

export default UserAvatarIcon
