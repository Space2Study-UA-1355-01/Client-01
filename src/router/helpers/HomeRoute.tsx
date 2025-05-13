import { Navigate } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { guestRoutes } from '~/router/constants/guestRoutes'

const HomeRoute = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  if (userRole) {
    return <Navigate replace to={guestRoutes[userRole]?.route} />
  }

  return <GuestHomePage />
}

export default HomeRoute
