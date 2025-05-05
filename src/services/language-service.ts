import i18n from '~/plugins/i18n'

const languageService = {
  toggleLanguage: () => {
    const nextLang = i18n.language === 'en' ? 'ua' : 'en'
    void i18n.changeLanguage(nextLang)
  },
  getCurrentLanguage: () => i18n.language
}

export default languageService
