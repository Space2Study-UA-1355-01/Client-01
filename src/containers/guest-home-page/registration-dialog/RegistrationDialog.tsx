import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useModalContext } from '~/context/modal-context'
import { UserRoleEnum } from '~/types'

import { signup } from '~/constants'

import RegistrationForm from '~/containers/guest-home-page/registration-form/RegistrationForm'
import GoogleLogin from '../google-login/GoogleLogin'

import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'

import styles from '~/containers/guest-home-page/registration-dialog/RegistrationDialog.styles'

interface RegistrationDialogProps {
  defaultRole: UserRoleEnum
}

const RegistrationDialog: FC<RegistrationDialogProps> = ({ defaultRole }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: defaultRole,
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
          src={defaultRole === UserRoleEnum.Student ? studentImg : tutorImg}
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
