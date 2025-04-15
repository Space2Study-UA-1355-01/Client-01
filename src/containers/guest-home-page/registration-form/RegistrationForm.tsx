import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { useModalContext } from '~/context/modal-context'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/login-form/LoginForm.styles'

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
    useInputVisibility() // No error passed since no validation

  const { openModal } = useModalContext()
  const { t } = useTranslation()

  const openForgotPassword = () => {
    openModal({ component: <ForgotPassword /> })
  }

  // Ensure all data fields are defined
  const safeData = {
    email: data.email ?? '',
    password: data.password ?? '',
    role: data.role ?? '',
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    confirmPassword: data.confirmPassword ?? ''
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppTextField
        autoFocus
        data-testid='firstName'
        errorMsg={errors.firstName ? t(errors.firstName) : ''} // Empty since no validation
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
        errorMsg={errors.lastName ? t(errors.lastName) : ''} // Empty since no validation
        fullWidth
        label={t('common.labels.lastName')}
        onBlur={handleBlur('lastName')}
        onChange={handleChange('lastName')}
        required
        sx={{ mb: '5px' }}
        type='text'
        value={safeData.lastName}
      />
      <AppTextField
        data-testid='email'
        errorMsg={errors.email ? t(errors.email) : ''} // Empty since no validation
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
        errorMsg={errors.password ? t(errors.password) : ''} // Empty since no validation
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
        errorMsg={errors.confirmPassword ? t(errors.confirmPassword) : ''} // Empty since no validation
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showPassword ? 'text' : 'password'}
        value={safeData.confirmPassword}
      />
      <AppTextField
        data-testid='role'
        disabled // Role is set by defaultRole
        errorMsg={errors.role ? t(errors.role) : ''} // Empty since no validation
        fullWidth
        label={t('common.labels.role')}
        onBlur={handleBlur('role')}
        onChange={handleChange('role')}
        required
        value={safeData.role}
      />
      <Typography
        component={ButtonBase}
        onClick={openForgotPassword}
        sx={styles.forgotPass}
        variant='subtitle2'
      >
        {t('login.forgotPassword')}
      </Typography>
      <AppButton sx={styles.loginButton} type='submit'>
        {t('common.labels.register')}
      </AppButton>
    </Box>
  )
}

export default RegistrationForm
