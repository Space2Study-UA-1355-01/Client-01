import { Typography, TextField, MenuItem, Stack, Box } from '@mui/material'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useTranslation } from 'react-i18next'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { ComponentEnum } from '~/types'

import { useStepContext } from '~/context/step-context'

import useForm from '~/hooks/use-form'
import { nameField, textField } from '~/utils/validations/common'
import { useEffect } from 'react'

const GeneralInfoStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const contextData = stepData.generalInfo.data
  const contextErrors = stepData.generalInfo.errors

  const {
    data,
    handleBlur,
    handleInputChange,
    errors: useFormErrors,
    handleErrors,
    validationTrigger
  } = useForm({
    initialValues: contextData,
    initialErrors: contextErrors,
    validations: {
      firstName: nameField,
      lastName: nameField,
      professionalSummary: textField(0, 200)
    }
  })

  useEffect(() => {
    handleStepData('generalInfo', data, useFormErrors)
  }, [data, useFormErrors])

  const { t } = useTranslation()

  function handleFirstNameChange(e) {
    handleInputChange('firstName')(e)
  }

  function handleFirstNameBlur(e) {
    handleBlur('firstName')(e)
    validationTrigger(['firstName', 'lastName'])
  }

  function handleProfessionalSummaryBlur(e) {
    handleBlur('professionalSummary')(e)
  }

  function handleLastNameChange(e) {
    handleInputChange('lastName')(e)
  }

  function handleLastNameBlur(e) {
    handleBlur('lastName')(e)
  }

  function handleCountrySelect(e) {
    handleInputChange('country')(e)
  }

  function handleCitySelect(e) {
    handleInputChange('city')(e)
  }

  const handleProfessionalSummaryChange = (e) => {
    const newValue = e.target.value
    handleInputChange('professionalSummary')(e)

    if (newValue.length > 200) {
      handleErrors('professionalSummary', 'common.errorMessages.longText')
    } else {
      handleErrors('professionalSummary', '')
    }
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
              value={data.firstName}
            />
            <TextField
              error={Boolean(useFormErrors.lastName)}
              fullWidth
              helperText={useFormErrors.lastName && t(useFormErrors.lastName)}
              label={t('common.labels.lastName')}
              onBlur={handleLastNameBlur}
              onChange={handleLastNameChange}
              required
              value={data.lastName}
            />
          </Stack>

          <Stack direction='row' spacing={2}>
            <TextField
              fullWidth
              label={t('common.labels.country')}
              onChange={handleCountrySelect}
              required
              select
              value={data.country}
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
              value={data.city}
            >
              <MenuItem value='Lisbon'>Lisbon</MenuItem>
              <MenuItem value='Faro'>Faro</MenuItem>
              <MenuItem value='Porto'>Porto</MenuItem>
            </TextField>
          </Stack>

          <TextField
            error={Boolean(useFormErrors.professionalSummary)}
            fullWidth
            helperText={
              useFormErrors.professionalSummary
                ? t(useFormErrors.professionalSummary)
                : `${data.professionalSummary.length}/200`
            }
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={200}
            multiline
            onBlur={handleProfessionalSummaryBlur}
            onChange={handleProfessionalSummaryChange}
            rows={4}
            sx={styles.textArea}
            value={data.professionalSummary}
          />
        </Stack>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
