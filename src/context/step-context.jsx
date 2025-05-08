import { createContext, useCallback, useContext, useState } from 'react'
import { useSelector } from 'react-redux'

const StepContext = createContext()

const StepProvider = ({ children, initialValues, stepLabels }) => {
  const { firstName, lastName } = useSelector((state) => state.appMain)

  const startInitialValues = {
    ...initialValues,
    firstName: firstName || '',
    lastName: lastName || ''
  }

  const [generalData, setGeneralData] = useState({
    data: startInitialValues,
    errors: {}
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState([])
  const [photo, setPhoto] = useState({
    data: [],
    errors: {}
  })
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels

  const stepData = {
    [generalLabel]: generalData,
    [subjectLabel]: subject,
    [languageLabel]: language,
    [photoLabel]: photo
  }

  const handleStepData = useCallback(
    (stepLabel, data, errors) => {
      switch (stepLabel) {
        case generalLabel:
          setGeneralData({ data, errors })
          break
        case subjectLabel:
          setSubject(data)
          break
        case languageLabel:
          setLanguage(data)
          break
        case photoLabel:
          setPhoto({ data, errors })
          break
        default:
          return
      }
    },
    [generalLabel, subjectLabel, languageLabel, photoLabel]
  )

  return (
    <StepContext.Provider
      value={{ stepData, handleStepData, photoLabel, subjectLabel }}
    >
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
