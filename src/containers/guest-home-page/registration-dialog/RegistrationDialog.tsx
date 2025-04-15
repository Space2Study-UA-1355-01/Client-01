import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { FC, useState } from 'react'
import RegistrationForm from '~/containers/guest-home-page/registration-form/RegistrationForm'
import { useModalContext } from '~/context/modal-context'
import loginImg from '~/assets/img/login-dialog/login.svg'
import { UserRoleEnum } from '~/types'
import styles from '~/containers/guest-home-page/registration-dialog/RegistrationDialog.styles'

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

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

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
          {t('registration.head')}
        </Typography>
        <Box sx={styles.form}>
          <Typography sx={styles.roleInfo}>
            {t('registration.registerAs', {
              role: t(`registration.${formData.role.toLowerCase()}`)
            })}
          </Typography>
          <RegistrationForm
            data={formData}
            errors={errors}
            handleBlur={() => {}}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default RegistrationDialog
