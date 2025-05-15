import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import Image from '~/assets/img/signup-dialog/student.svg'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import {
  ButtonTypeEnum,
  CategoryNameInterface,
  ComponentEnum,
  ErrorResponse
} from '~/types'
import { snackbarVariants } from '~/constants'
import { categoryService } from '~/services/category-service'
import { validations } from '~/containers/find-offer/create-new-subject/CreateNewSubject.constants'
import { styles } from '~/containers/find-offer/create-new-subject/CreateNewSubject.styles'
import { subjectService } from '~/services/subject-service'

const CreateSubjectModal = () => {
  const { closeModal, setUnsavedChanges } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const { t } = useTranslation()

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? error.message : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'categoriesPage.newSubject.successMessage'
    })
    closeModal()
  }

  const sendSubjectRequest = (): Promise<AxiosResponse> =>
    subjectService.postSubject(data)

  const { loading, fetchData } = useAxios({
    service: sendSubjectRequest,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const {
    data,
    errors,
    isDirty,
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    handleSubmit
  } = useForm({
    initialValues: {
      name: '',
      category: '',
      description: ''
    },
    onSubmit: fetchData,
    validations
  })

  useEffect(() => {
    setUnsavedChanges(isDirty)
  }, [isDirty, setUnsavedChanges])

  const handleCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null | string
  ) => {
    if (typeof value === 'object') {
      handleNonInputValueChange('category', value?._id ?? '')
    } else {
      handleNonInputValueChange('category', '')
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgWrapper}>
        <Box component='img' src={Image} sx={styles.img} />
      </Box>
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.formWrapper}
      >
        <TitleWithDescription
          description={t('categoriesPage.newSubject.description')}
          style={styles.titleDescription}
          title={t('categoriesPage.newSubject.title')}
        />
        <Typography sx={styles.inputTitle}>
          {t('categoriesPage.newSubject.subject')}
        </Typography>
        <AppTextField
          errorMsg={t(errors.name)}
          fullWidth
          label={t('categoriesPage.newSubject.labels.subject')}
          onBlur={handleBlur('name')}
          onChange={handleInputChange('name')}
          value={data.name}
        />
        <Typography sx={styles.inputTitle}>
          {t('categoriesPage.newSubject.category')}
        </Typography>
        <AsyncAutocomplete
          fetchOnFocus
          labelField='name'
          onBlur={handleBlur('category')}
          onChange={handleCategoryChange}
          onInputChange={handleCategoryChange}
          service={categoryService.getCategoriesNames}
          textFieldProps={{
            label: t('offerPage.labels.category'),
            error: Boolean(errors.category),
            helperText: t(errors.category) || ' '
          }}
          value={data.category}
          valueField='_id'
        />
        <AppTextArea
          errorMsg={t(errors.description)}
          fullWidth
          label={t('offerDetailsPage.enrollOffer.labels.info')}
          maxLength={1000}
          onBlur={handleBlur('description')}
          onChange={handleInputChange('description')}
          sx={styles.textArea}
          title={t('categoriesPage.newSubject.info')}
          value={data.description}
        />
        <AppButton
          loading={loading}
          sx={styles.button}
          type={ButtonTypeEnum.Submit}
        >
          {t('button.sendRequest')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateSubjectModal
