import { AppDispatch } from '~/redux/store'
import { userService } from '~/services/user-service'
import { setUserProfileData } from '~/redux/reducer'
import { UserRole } from '~/types'
import languageService from '~/services/language-service'

export const loadUserProfileData = async (
  dispatch: AppDispatch,
  userId: string,
  userRole: UserRole
) => {
  try {
    const { data } = await userService.getUserById(userId, userRole)
    console.log(`loadUserProfileData`, data)
    const { firstName, lastName, photo, appLanguage } = data
    dispatch(
      setUserProfileData({
        firstName,
        lastName,
        photo: photo ?? '',
        appLanguage: appLanguage ?? ''
      })
    )
    if (appLanguage) {
      await languageService.setLanguage(appLanguage)
    }
  } catch (error) {
    console.error('Failed to fetch user profile', error)
  }
}
