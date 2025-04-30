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
import { useAppSelector } from '~/hooks/use-redux'
import { student } from '~/constants'

import { useModalContext } from '~/context/modal-context'
import useConfirm from '~/hooks/use-confirm'
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
  const { setUnsavedChanges } = useModalContext()
  const { setNeedConfirmation } = useConfirm()

  const { userRole } = useAppSelector((state) => state.appMain)

  const isStudent = userRole === student

  const languageLabel = 'language'
  const selectedLanguages = stepData[languageLabel] || []

  const autocompleteValue =
    isStudent || (selectedLanguages.length === 1 && !tempLang)
      ? selectedLanguages[0] ?? null
      : tempLang

  const optionDisabledProp = (option) =>
    selectedLanguages.some((lang) => lang.id === option.id)

  const handleOnChange = (e, newValue) => {
    if (!newValue) {
      if (isStudent) {
        handleStepData(languageLabel, [])
      }
      setTempLang(null)
      return
    }

    if (!selectedLanguages.length || isStudent) {
      handleStepData(languageLabel, [newValue])
      setUnsavedChanges(true)
      setNeedConfirmation(true)
      setTempLang(null)
    } else {
      setTempLang(newValue)
    }
  }

  const handleDeleteLanguage = (langId) => {
    const updated = selectedLanguages.filter((lang) => lang.id !== langId)
    handleStepData(languageLabel, updated)
    setUnsavedChanges(true)
    setNeedConfirmation(true)
    setTempLang(null)
  }

  const handleButtonClick = () => {
    if (
      tempLang &&
      !selectedLanguages.some((lang) => lang.id === tempLang.id)
    ) {
      const updatedLangs = [...selectedLanguages, tempLang]
      handleStepData(languageLabel, updatedLangs)
      setUnsavedChanges(true)
      setNeedConfirmation(true)
      setTempLang(null)
    }
  }

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.mobileHeading}>
        {t('becomeTutor.languages.title')}
      </Typography>

      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.rigthBox}>
        <Box>
          <Typography sx={styles.desktopHeading}>
            {t('becomeTutor.languages.title')}
          </Typography>

          <Autocomplete
            getOptionDisabled={optionDisabledProp}
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
            value={autocompleteValue}
          />

          {!isStudent && (
            <Box>
              {selectedLanguages.length >= 1 && (
                <Button
                  onClick={handleButtonClick}
                  sx={styles.button}
                  variant='contained'
                >
                  {t('becomeTutor.languages.button')}
                </Button>
              )}

              <Box sx={styles.chipContainer}>
                {selectedLanguages.map((lang) => (
                  <Chip
                    key={lang.id}
                    label={lang.label}
                    onDelete={() => handleDeleteLanguage(lang.id)}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
