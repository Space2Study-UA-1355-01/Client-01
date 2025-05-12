import { useCallback, useState } from 'react'

import useAxios from '~/hooks/use-axios'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import { useStepContext } from '~/context/step-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { uploadPhotoService } from '~/services/upload-photo-service'
import { snackbarVariants } from '~/constants'
import { loadUserProfileData } from '~/redux/userActions'

const useSteps = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useModalContext()
  const { stepData, subjectLabel } = useStepContext()
  const { setAlert } = useSnackBarContext()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const dispatch = useAppDispatch()

  const updateUser = useCallback(
    (data) => {
      return userService.updateUser(userId, userRole, data)
    },
    [userId, userRole]
  )
  const uploadPhoto = useCallback((file) => uploadPhotoService.upload(file), [])

  const handleResponseError = (error) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = async () => {
    try {
      await loadUserProfileData(dispatch, userId, userRole)

      setAlert({
        severity: snackbarVariants.success,
        message: 'becomeTutor.successMessage'
      })
    } catch (error) {
      console.error('Failed to load user profile data', error)

      setAlert({
        severity: snackbarVariants.error,
        message: 'errors.warningLoadingUserData'
      })
    } finally {
      closeModal()
    }
  }

  const handleResponseWarning = () => {
    setAlert({
      severity: snackbarVariants.warning,
      message: 'becomeTutor.warningMessage'
    })
    closeModal()
  }

  const submitPhoto = () => {
    const selectedFile = stepData.photo?.data[0]

    if (selectedFile) {
      uploadPhotoFetch(selectedFile)
    } else {
      handleResponse()
    }
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: submitPhoto,
    onResponseError: handleResponseError
  })

  const { loading: uploadLoading, fetchData: uploadPhotoFetch } = useAxios({
    service: uploadPhoto,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseWarning
  })

  const stepErrors = Object.values(stepData).map(
    (data) =>
      data && data.errors && Object.values(data.errors).find((error) => error)
  )

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = () => {
    const hasErrors = stepErrors.find((error) => error)

    const { firstName, lastName, country, city, professionalSummary } =
      stepData.generalInfo.data

    const data = {
      firstName,
      lastName,
      address: {
        country: country ?? '',
        city: city ?? ''
      },
      professionalSummary,
      mainSubjects:
        stepData[subjectLabel]?.map((subject) => subject.categoryId) ?? [],
      nativeLanguage: stepData.language?.map((lang) => lang.label) ?? []
    }

    !hasErrors && fetchData(data)
  }

  const stepOperation = {
    next,
    back,
    handleSubmit,
    setActiveStep
  }

  return {
    activeStep,
    stepErrors,
    isLastStep,
    stepOperation,
    loading,
    uploadLoading
  }
}

export default useSteps
