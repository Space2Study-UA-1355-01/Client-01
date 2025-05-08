import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useModalContext } from '~/context/modal-context'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/registration-form/RegistrationForm.styles'
import Loader from '~/components/loader/Loader'

type FormFields =
  | 'email'
  | 'password'
  | 'role'
  | 'firstName'
  | 'lastName'
  | 'confirmPassword'

interface RegistrationFormProps {
  isSubmitting: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (
    field: FormFields
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (
    field: FormFields
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
  data: {
    email: string
    password: string
    role: string
    firstName: string
    lastName: string
    confirmPassword: string
  }
  errors: {
    email?: string
    password?: string
    role?: string
    firstName?: string
    lastName?: string
    confirmPassword?: string
  }
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isSubmitting,
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const passwordVisibility = useInputVisibility(Boolean(errors.password))
  const confirmPasswordVisibility = useInputVisibility(
    Boolean(errors.confirmPassword)
  )

  const [iAgreeCheck, setIAgreeCheck] = useState(false)
  const { setUnsavedChanges } = useModalContext()

  const { t } = useTranslation()

  const safeData = {
    email: data.email ?? '',
    password: data.password ?? '',
    role: data.role ?? '',
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    confirmPassword: data.confirmPassword ?? ''
  }

  const isFormComplete =
    safeData.email.trim() &&
    safeData.password.trim() &&
    safeData.confirmPassword.trim() &&
    safeData.firstName.trim() &&
    safeData.lastName.trim() &&
    iAgreeCheck

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIAgreeCheck(e.target.checked)
  }

  useEffect(() => {
    const isDirty = Object.entries(data)
      .filter(([key]) => key !== 'role')
      .some(([, value]) => value.trim() !== '')
    setUnsavedChanges(isDirty)
  }, [data, setUnsavedChanges])

  const textFields = [
    {
      id: 'firstName',
      label: t('common.labels.firstName'),
      value: safeData.firstName,
      error: errors.firstName ? t(errors.firstName) : '',
      handleChange: handleChange('firstName'),
      handleBlur: handleBlur('firstName'),
      autoFocus: true,
      sx: { mb: '15px' },
      type: 'text'
    },
    {
      id: 'lastName',
      label: t('common.labels.lastName'),
      value: safeData.lastName,
      error: errors.lastName ? t(errors.lastName) : '',
      handleChange: handleChange('lastName'),
      handleBlur: handleBlur('lastName'),
      sx: { mb: '5px' },
      type: 'text'
    },
    {
      id: 'email',
      label: t('common.labels.email'),
      value: safeData.email,
      error: errors.email ? t(errors.email) : '',
      handleChange: handleChange('email'),
      handleBlur: handleBlur('email'),
      sx: { mb: '5px' },
      type: 'email'
    },
    {
      id: 'password',
      label: t('common.labels.password'),
      value: safeData.password,
      error: errors.password ? t(errors.password) : '',
      handleChange: handleChange('password'),
      handleBlur: handleBlur('password'),
      type: passwordVisibility.showInputText ? 'text' : 'password',
      InputProps: passwordVisibility.inputVisibility,
      sx: { mb: '5px' }
    },
    {
      id: 'confirmPassword',
      label: t('common.labels.confirmPassword'),
      value: safeData.confirmPassword,
      error: errors.confirmPassword ? t(errors.confirmPassword) : '',
      handleChange: handleChange('confirmPassword'),
      handleBlur: handleBlur('confirmPassword'),
      type: confirmPasswordVisibility.showInputText ? 'text' : 'password',
      InputProps: confirmPasswordVisibility.inputVisibility
    }
  ]

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.fullname}>
        {textFields.slice(0, 2).map((field) => (
          <AppTextField
            autoFocus={field.autoFocus}
            data-testid={field.id}
            errorMsg={field.error}
            fullWidth
            key={field.id}
            label={field.label}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            required
            sx={field.sx}
            type={field.type}
            value={field.value}
          />
        ))}
      </Box>
      {textFields.slice(2).map((field) => (
        <AppTextField
          InputProps={field.InputProps}
          data-testid={field.id}
          errorMsg={field.error}
          fullWidth
          key={field.id}
          label={field.label}
          onBlur={field.handleBlur}
          onChange={field.handleChange}
          required
          sx={field.sx}
          type={field.type}
          value={field.value}
        />
      ))}
      <FormControlLabel
        control={
          <Checkbox
            checked={iAgreeCheck}
            color='primary'
            onChange={handleCheckboxChange}
          />
        }
        label={
          <Typography variant='body2'>
            {t('signup.iAgree')}{' '}
            <Link href='#' underline='hover'>
              Term
            </Link>{' '}
            {t('and')}{' '}
            <Link href='#' underline='hover'>
              Privacy Policy
            </Link>
          </Typography>
        }
      />
      <AppButton
        disabled={!isFormComplete || isSubmitting}
        sx={styles.loginButton}
        type='submit'
      >
        {isSubmitting ? (
          <Loader size={20} sx={{ opacity: '0.6' }} />
        ) : (
          t('common.labels.signup')
        )}
      </AppButton>
    </Box>
  )
}

export default RegistrationForm
