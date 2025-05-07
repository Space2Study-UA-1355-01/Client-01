import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useModalContext } from '~/context/modal-context'
import { UserRoleEnum } from '~/types'

import { signup } from '~/constants'

import RegistrationForm from '~/containers/guest-home-page/registration-form/RegistrationForm'
import GoogleLogin from '../google-login/GoogleLogin'

import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'

import styles from '~/containers/guest-home-page/registration-dialog/RegistrationDialog.styles'

import { useForm } from '~/hooks/use-form'
import EmailInfoPopup from '~/components/email-info-popup/EmailInfoPopup'
import { useSignUpMutation } from '~/services/auth-service'

interface RegistrationDialogProps {
  defaultRole: UserRoleEnum
}

const RegistrationDialog: FC<RegistrationDialogProps> = ({ defaultRole }) => {
  const { t } = useTranslation()
  const { closeModal, openModal } = useModalContext()
  const [signUp] = useSignUpMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'common.errorMessages.emptyField'
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) return 'common.errorMessages.emailValid'
    return undefined
  }

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'common.errorMessages.emptyField'
    if (password.length < 8 || password.length > 25)
      return 'common.errorMessages.passwordLength'
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return 'common.errorMessages.passwordValid'
    }
    return undefined
  }

  const validateConfirmPassword = (
    confirmPassword: string
  ): string | undefined => {
    if (!confirmPassword) return 'common.errorMessages.emptyField'
    if (confirmPassword !== data.password)
      return 'common.errorMessages.passwordsDontMatch'
    return undefined
  }

  const validateName = (name: string): string | undefined => {
    if (!name) return 'common.errorMessages.emptyField'
    if (name.length > 30) return 'common.errorMessages.nameLength'
    if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/.test(name))
      return 'common.errorMessages.nameAlphabeticOnly'
    return undefined
  }
  const {
    data,
    errors,
    handleInputChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
    validationTrigger
  } = useForm({
    initialValues: {
      email: '',
      password: '',
      role: defaultRole || UserRoleEnum.Student,
      firstName: '',
      lastName: '',
      confirmPassword: ''
    },
    validations: {
      email: validateEmail,
      password: validatePassword,
      firstName: validateName,
      lastName: validateName,
      confirmPassword: validateConfirmPassword
    },
    onSubmit: async () => {
      setIsSubmitting(true)
      console.log('Form submitted with values:', data)
      try {
        const response = await signUp(data).unwrap()
        console.log('Registration succesful!', response)
        closeModal()
        setIsSubmitting(false)
        openModal({
          component: (
            <EmailInfoPopup email={data.email} onClose={closeModal} open />
          )
        })
      } catch (e) {
        console.log('Something went wrong', e)
        setIsSubmitting(false)
      }
      return Promise.resolve()
    }
  })

  useEffect(() => {
    if (data.confirmPassword.trim()) {
      validationTrigger(['confirmPassword'])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.password])

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
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
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
