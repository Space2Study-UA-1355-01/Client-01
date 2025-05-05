import i18n from '~/plugins/i18n'

const LANGUAGE_KEY = 'app_language'

const languageService = {
  toggleLanguage: () => {
    const nextLang = i18n.language === 'en' ? 'ua' : 'en'
    void languageService.setLanguage(nextLang)
  },
  setLanguage: async (lng: string) => {
    localStorage.setItem(LANGUAGE_KEY, lng)
    await i18n.changeLanguage(lng)
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
