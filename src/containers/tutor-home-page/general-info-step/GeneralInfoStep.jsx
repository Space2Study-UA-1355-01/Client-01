import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import {
  Typography,
  TextField,
  Autocomplete,
  CircularProgress,
  Stack
} from '@mui/material'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useTranslation } from 'react-i18next'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { ComponentEnum } from '~/types'

import { useStepContext } from '~/context/step-context'
import { useModalContext } from '~/context/modal-context'
import useConfirm from '~/hooks/use-confirm'

import useForm from '~/hooks/use-form'
import useDebounce from '~/hooks/use-debounce'
import { nameField, textField } from '~/utils/validations/common'

const GeneralInfoStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const { setUnsavedChanges } = useModalContext()
  const { setNeedConfirmation } = useConfirm()
  const contextData = stepData.generalInfo.data
  const contextErrors = stepData.generalInfo.errors

  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [loadingCountries, setLoadingCountries] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [countriesPage, setCountriesPage] = useState(1)
  const [citiesPage, setCitiesPage] = useState(1)

  const apiPath = import.meta.env.VITE_API_BASE_PATH
  const maxTextLength = 200
  const {
    data,
    handleBlur,
    handleInputChange,
    validationTrigger,
    errors: useFormErrors
  } = useForm({
    initialValues: contextData,
    initialErrors: contextErrors,
    validations: {
      firstName: nameField,
      lastName: nameField,
      professionalSummary: textField(0, maxTextLength)
    }
  })

  useEffect(() => {
    handleStepData('generalInfo', data, useFormErrors)
  }, [data, useFormErrors, handleStepData])

  const { t } = useTranslation()

  const handleFieldChange = (fieldName) => (e) => {
    const { value } = e.target

    handleStepData('generalInfo', {
      ...contextData,
      [fieldName]: value
    })
    setUnsavedChanges(true)
    setNeedConfirmation(true)
    handleInputChange(fieldName)(e)
  }

  function handleCountrySelect(_, newValue) {
    setCities([])
    setCitiesPage(1)

    handleInputChange('country')({
      target: { value: newValue ? newValue.iso2 : '' }
    })
    setUnsavedChanges(true)
    setNeedConfirmation(true)

    if (newValue) {
      fetchCities('', newValue.iso2, 1)
    }
  }

  function handleCitySelect(_, newValue) {
    handleInputChange('city')({
      target: { value: newValue ? newValue.name : '' }
    })
    setUnsavedChanges(true)
    setNeedConfirmation(true)
  }

  const handleFieldBlur = (fieldName) => (e) => {
    validationTrigger(['lastName'])
    handleBlur(fieldName)(e)
  }

  const fetchCountries = useCallback(
    async (searchTerm = '', page = 1) => {
      setLoadingCountries(true)
      try {
        const res = await axios.get(`${apiPath}/countries`, {
          params: { search: searchTerm, page, limit: 20 }
        })
        setCountries((prev) => [...prev, ...res.data.data])
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingCountries(false)
      }
    },
    [apiPath]
  )

  const fetchCities = useCallback(
    async (searchTerm = '', countryCode, page = 1) => {
      if (!countryCode) return
      setLoadingCities(true)
      try {
        const res = await axios.get(
          `${apiPath}/countries/${countryCode}/cities`,
          { params: { search: searchTerm, page, limit: 20 } }
        )
        setCities((prev) => [...prev, ...res.data.data])
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingCities(false)
      }
    },
    [apiPath]
  )

  const handleScrollLoadMore = (event, type) => {
    const listboxNode = event.currentTarget
    const scrollTop = listboxNode.scrollTop
    const scrollHeight = listboxNode.scrollHeight
    const clientHeight = listboxNode.clientHeight

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (type === 'countries' && !loadingCountries) {
        const nextPage = countriesPage + 1
        setCountriesPage(nextPage)
        fetchCountries('', nextPage)
      }

      if (type === 'cities' && !loadingCities) {
        const nextPage = citiesPage + 1
        setCitiesPage(nextPage)
        fetchCities('', data.country, nextPage)
      }
    }
  }

  const fetchCountriesDebounced = useDebounce(async (searchTerm) => {
    if (searchTerm) {
      setCountries([])
      setCountriesPage(1)
      fetchCountries(searchTerm)
    }
  }, 500)

  const fetchCitiesDebounced = useDebounce(async (searchTerm, countryCode) => {
    if (searchTerm && countryCode) {
      setCities([])
      setCitiesPage(1)
      fetchCities(searchTerm, countryCode)
    }
  }, 500)

  const handleCountrySearch = (event) => {
    if (!event || !event.target) return

    const searchTerm = event.target.value

    if (!searchTerm) {
      setCountries([])
      setCountriesPage(1)
      fetchCountries('', 1)
      return
    }

    fetchCountriesDebounced(searchTerm)
  }

  const handleCitySearch = (event) => {
    if (!event || !event.target) return

    const searchTerm = event.target.value

    if (!data.country) {
      setCities([])
      setCitiesPage(1)
      return
    }

    if (!searchTerm) {
      setCities([])
      setCitiesPage(1)
      fetchCities('', data.country, 1)
      return
    }

    fetchCitiesDebounced(searchTerm, data.country)
  }

  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  useEffect(() => {
    if (data.country) {
      setCities([])
      setCitiesPage(1)
      fetchCities('', data.country, 1)
    }
  }, [data.country, fetchCities])

  const selectedCountry = countries.find((c) => c.iso2 === data.country) || null
  const selectedCity = cities.find((c) => c.name === data.city) || null

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component={ComponentEnum.Img} src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Stack sx={styles.form}>
          <Typography>{t('becomeTutor.generalInfo.title')}</Typography>
          <Stack direction='row' spacing={2}>
            <TextField
              autoFocus
              error={Boolean(useFormErrors.firstName)}
              fullWidth
              helperText={useFormErrors.firstName && t(useFormErrors.firstName)}
              label={t('common.labels.firstName')}
              onBlur={handleFieldBlur('firstName')}
              onChange={handleFieldChange('firstName')}
              required
              value={data.firstName}
            />
            <TextField
              error={Boolean(useFormErrors.lastName)}
              fullWidth
              helperText={useFormErrors.lastName && t(useFormErrors.lastName)}
              label={t('common.labels.lastName')}
              onBlur={handleFieldBlur('lastName')}
              onChange={handleFieldChange('lastName')}
              required
              value={data.lastName}
            />
          </Stack>

          <Stack direction='row' spacing={2}>
            <Autocomplete
              ListboxProps={{
                onScroll: (event) => handleScrollLoadMore(event, 'countries'),
                style: { maxHeight: '300px', overflow: 'auto' }
              }}
              autoHighlight={false}
              disableListWrap
              fullWidth
              getOptionLabel={(option) => option.name || ''}
              loading={loadingCountries}
              onChange={handleCountrySelect}
              onInputChange={handleCountrySearch}
              options={countries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingCountries ? (
                          <CircularProgress size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                  label={t('common.labels.country')}
                />
              )}
              value={selectedCountry}
            />
            <Autocomplete
              ListboxProps={{
                onScroll: (event) => handleScrollLoadMore(event, 'cities'),
                style: { maxHeight: '300px', overflow: 'auto' }
              }}
              autoHighlight={false}
              disableListWrap
              fullWidth
              getOptionLabel={(option) => option.name || ''}
              loading={loadingCities}
              onChange={handleCitySelect}
              onInputChange={handleCitySearch}
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingCities ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                  label={t('common.labels.city')}
                />
              )}
              value={selectedCity}
            />
          </Stack>
          <TextField
            error={useFormErrors.professionalSummary}
            fullWidth
            helperText={
              useFormErrors.professionalSummary
                ? t(useFormErrors.professionalSummary)
                : `${data.professionalSummary.length}/${maxTextLength}`
            }
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={maxTextLength}
            multiline
            onBlur={handleFieldBlur('professionalSummary')}
            onChange={handleFieldChange('professionalSummary')}
            rows={4}
            sx={styles.textArea}
            value={data.professionalSummary}
          />
        </Stack>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
