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

interface RegistrationFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (
    field: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (field: string) => (e: React.FocusEvent<HTMLInputElement>) => void
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
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility()

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

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.fullname}>
        <AppTextField
          autoFocus
          data-testid='firstName'
          errorMsg={errors.firstName ? t(errors.firstName) : ''}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          sx={{ mb: '5px' }}
          type='text'
          value={safeData.firstName}
        />
        <AppTextField
          data-testid='lastName'
          errorMsg={errors.lastName ? t(errors.lastName) : ''}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          sx={{ mb: '5px' }}
          type='text'
          value={safeData.lastName}
        />
      </Box>
      <AppTextField
        data-testid='email'
        errorMsg={errors.email ? t(errors.email) : ''}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        sx={{ mb: '5px' }}
        type='email'
        value={safeData.email}
      />
      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={errors.password ? t(errors.password) : ''}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={safeData.password}
      />
      <AppTextField
        InputProps={passwordVisibility}
        data-testid='confirmPassword'
        errorMsg={errors.confirmPassword ? t(errors.confirmPassword) : ''}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showPassword ? 'text' : 'password'}
        value={safeData.confirmPassword}
      />
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
        sx={{ mt: 1 }}
      />
      <AppButton
        disabled={!isFormComplete}
        sx={styles.loginButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default RegistrationForm
