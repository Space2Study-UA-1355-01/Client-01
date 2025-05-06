import i18n from '~/plugins/i18n'
import { userService } from './user-service'
import { UserRole } from '~/types'

const LANGUAGE_KEY = 'app_language'

interface LanguageService {
  toggleLanguage: (userId?: string, userRole?: UserRole) => void
  setLanguage: (
    lng: string,
    userId?: string,
    userRole?: UserRole
  ) => Promise<void>
  getSavedLanguage: () => string | null
  getCurrentLanguage: () => string
  initLanguage: () => void
}

const languageService: LanguageService = {
  toggleLanguage: (userId?: string, userRole?: UserRole) => {
    const nextLang = i18n.language === 'en' ? 'ua' : 'en'
    void languageService.setLanguage(nextLang, userId, userRole)
  },
  setLanguage: async (lng: string, userId?: string, userRole?: UserRole) => {
    if (i18n.language === lng) return

    localStorage.setItem(LANGUAGE_KEY, lng)
    await i18n.changeLanguage(lng)

    if (userId && userRole) {
      try {
        await userService.updateUserLanguage(userId, userRole, {
          appLanguage: lng
        })
      } catch (err) {
        console.error('Failed to update language on server', err)
      }
    }
  },

  getSavedLanguage: (): string | null => {
    return localStorage.getItem(LANGUAGE_KEY)
  },

  getCurrentLanguage: (): string => {
    return i18n.language
  },

  initLanguage: () => {
    const savedLang = languageService.getSavedLanguage()
    if (savedLang && i18n.language !== savedLang) {
      void i18n.changeLanguage(savedLang)
    }
  }
}

export default languageService
