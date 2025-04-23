import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import {
  Autocomplete,
  Button,
  Chip,
  TextField,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStepContext } from '~/context/step-context'
import { useState } from 'react'

const languages = [
  { id: '1', label: 'English' },
  { id: '2', label: 'Ukrainian' },
  { id: '3', label: 'Polish' },
  { id: '4', label: 'German' },
  { id: '5', label: 'French' },
  { id: '6', label: 'Spanish' },
  { id: '7', label: 'Arabic' }
]

const LanguageStep = ({ btnsBox }) => {
  const [tempLang, setTempLang] = useState(null)
  const { t } = useTranslation()
  const { handleStepData, stepData } = useStepContext()

  const languageLabel = 'language'
  const selectedLanguages = stepData[languageLabel] || []

  console.log(stepData)

  const handleOnChange = (e, newValue) => {
    if (!newValue) return

    if (!selectedLanguages.length) {
      handleStepData(languageLabel, [newValue])
      setTempLang(null)
    } else {
      setTempLang(newValue)
    }
  }

  const handleDeleteLanguage = (langId) => {
    const updated = selectedLanguages.filter((lang) => lang.id !== langId)
    handleStepData(languageLabel, updated)
    setTempLang(null)
  }

  const handleButtonClick = () => {
    if (
      tempLang &&
      !selectedLanguages.find((lang) => lang.id === tempLang.id)
    ) {
      const updatedLangs = [...selectedLanguages, tempLang]
      handleStepData(languageLabel, updatedLangs)
      setTempLang(null)
    }
  }

  return (
    <Box sx={styles.container}>
      {/* Заголовок тільки на мобілці */}
      <Typography sx={styles.mobileHeading}>
        {t('becomeTutor.languages.title')}
      </Typography>

      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.rigthBox}>
        {/* Заголовок на десктопі */}
        <Box>
          <Typography sx={styles.desktopHeading}>
            {t('becomeTutor.languages.title')}
          </Typography>

          <Autocomplete
            getOptionDisabled={(option) =>
              selectedLanguages.some((lang) => lang.id === option.id)
            }
            onChange={handleOnChange}
            options={languages}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('becomeTutor.languages.autocompleteLabel')}
              />
            )}
            renderTags={() => null}
            sx={styles.input}
            value={tempLang}
          />

          {selectedLanguages.length >= 1 && (
            <Button
              onClick={handleButtonClick}
              sx={{ width: 1 }}
              variant='contained'
            >
              {t('becomeTutor.languages.button')}
            </Button>
          )}

          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedLanguages.map((lang) => (
              <Chip
                key={lang.id}
                label={lang.label}
                onDelete={() => handleDeleteLanguage(lang.id)}
              />
            ))}
          </Box>
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
