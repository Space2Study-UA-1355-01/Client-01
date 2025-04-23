import Box from '@mui/material/Box'

import { Typography, TextField, MenuItem, Stack } from '@mui/material'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useTranslation } from 'react-i18next'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { ComponentEnum } from '~/types'

import { useStepContext } from '~/context/step-context'

import useForm from '~/hooks/use-form'
import { nameField, textField } from '~/utils/validations/common'

const GeneralInfoStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const { data: contextData } = stepData.generalInfo
  const { firstName, lastName, city, country, professionalSummary } =
    contextData

  const {
    handleBlur,
    handleInputChange,
    errors: useFormErrors
  } = useForm({
    initialValues: contextData,
    validations: {
      firstName: nameField,
      lastName: nameField,
      professionalSummary: textField(0, 200)
    }
  })

  const { t } = useTranslation()

  function handleFirstNameChange(e) {
    const newValue = e.target.value
    handleStepData('generalInfo', { ...contextData, firstName: newValue })
    handleInputChange('firstName')(e)
  }

  function handleFirstNameBlur(e) {
    handleBlur('firstName')(e)
  }

  function handleLastNameChange(e) {
    handleStepData('generalInfo', { ...contextData, lastName: e.target.value })
    handleInputChange('lastName')(e)
  }

  function handleLastNameBlur(e) {
    handleBlur('lastName')(e)
  }

  function handleCountrySelect(e) {
    handleStepData('generalInfo', { ...contextData, country: e.target.value })
  }

  function handleCitySelect(e) {
    handleStepData('generalInfo', { ...contextData, city: e.target.value })
  }

  function handleProfessionalSummaryChange(e) {
    handleStepData('generalInfo', {
      ...contextData,
      professionalSummary: e.target.value
    })
  }

  function handleProfessionalSummaryBlur(e) {
    handleBlur('professionalSummary')(e)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component={ComponentEnum.Img} src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Stack sx={styles.form}>
          <Typography>
            Please complete the registration form for the best possible
            experience.
          </Typography>
          <Stack direction='row' spacing={2}>
            <TextField
              autoFocus
              error={Boolean(useFormErrors.firstName)}
              fullWidth
              helperText={useFormErrors.firstName && t(useFormErrors.firstName)}
              label={t('common.labels.firstName')}
              onBlur={handleFirstNameBlur}
              onChange={handleFirstNameChange}
              required
              value={firstName}
            />
            <TextField
              error={Boolean(useFormErrors.lastName)}
              fullWidth
              helperText={useFormErrors.lastName && t(useFormErrors.lastName)}
              label={t('common.labels.lastName')}
              onBlur={handleLastNameBlur}
              onChange={handleLastNameChange}
              required
              value={lastName}
            />
          </Stack>

          <Stack direction='row' spacing={2}>
            <TextField
              fullWidth
              label={t('common.labels.country')}
              onChange={handleCountrySelect}
              required
              select
              value={country}
            >
              <MenuItem value='Portugal'>Portugal</MenuItem>
              <MenuItem value='Spain'>Spain</MenuItem>
              <MenuItem value='France'>France</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label={t('common.labels.city')}
              onChange={handleCitySelect}
              required
              select
              value={city}
            >
              <MenuItem value='Lisbon'>Lisbon</MenuItem>
              <MenuItem value='Faro'>Faro</MenuItem>
              <MenuItem value='Porto'>Porto</MenuItem>
            </TextField>
          </Stack>

          <AppTextArea
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={200}
            onBlur={handleProfessionalSummaryBlur}
            onChange={handleProfessionalSummaryChange}
            sx={styles.textArea}
            value={professionalSummary}
          />
        </Stack>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
