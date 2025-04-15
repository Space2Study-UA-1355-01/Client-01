import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { FC, useState } from 'react'
import RegistrationForm from '~/containers/guest-home-page/registration-form/RegistrationForm'
import { useModalContext } from '~/context/modal-context'
import loginImg from '~/assets/img/login-dialog/login.svg'
import { UserRoleEnum } from '~/types'
import styles from '~/containers/guest-home-page/registration-dialog/RegistrationDialog.styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import GoogleLogin from '../google-login/GoogleLogin'
import { signup } from '~/constants'
import Link from '@mui/material/Link'

interface RegistrationDialogProps {
  defaultRole: UserRoleEnum
}

const RegistrationDialog: FC<RegistrationDialogProps> = ({ defaultRole }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  // Minimal form state without validation
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: defaultRole || 'Student',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  })

  const [iAgreeCheck, setIAgreeCheck] = useState(false)

  // Handle input changes
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIAgreeCheck(e.target.checked)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted with values:', formData)
    console.log('User registered with role:', formData.role)
    try {
      closeModal()
    } catch (e) {
      console.log('Something went wrong while closing modal')
    }
  }

  // Mock errors object (empty since no validation)
  const errors = {
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='registration'
          component='img'
          src={loginImg}
          sx={styles.img}
        />
      </Box>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t(`signup.head.${defaultRole}`)}
        </Typography>
        <Box sx={styles.form}>
          <RegistrationForm
            data={formData}
            errors={errors}
            handleBlur={() => {}}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
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
        </Box>
        <GoogleLogin
          buttonWidth={styles.form.maxWidth}
          role={signup}
          type='signup'
        />
      </Box>
    </Box>
  )
}

export default RegistrationDialog
