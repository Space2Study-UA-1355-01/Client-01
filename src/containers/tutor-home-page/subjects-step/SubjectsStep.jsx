import { useCallback, useEffect, useState, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStepContext } from '~/context/step-context'

import AppAutoCompleteCategories from '~/components/app-autocomplete-categories/AppAutoCompleteCategories'
import AppButton from '~/components/app-button/AppButton'
import AppChiplistCategory from '~/components/app-chiplist-category/AppChiplistCategory'
import studyCategoryImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import useCategoriesStepper from '~/hooks/use-categories-stepper'
import useSubjectsStepper from '~/hooks/use-subjects-stepper'
import { styles } from './SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const subjectLabel = 'subjects'
  const subjects = Array.isArray(stepData[subjectLabel])
    ? stepData[subjectLabel].map((item) =>
        typeof item === 'string' ? { name: item, categoryId: null } : item
      )
    : []

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [visibleCategories, setVisibleCategories] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [setCategoriesLoaded] = useState(false)

  const categoriesPerPage = 4

  const {
    response: categories,
    fetchData: fetchCategories,
    error: categoriesError
  } = useCategoriesStepper({
    fetchOnMount: false
  })

  useEffect(() => {
    fetchCategories({ page, limit: categoriesPerPage })
      .then(() => {
        setCategoriesLoaded(true)
      })
      .catch((error) => {
        console.error('Error category download:', error)
      })
  }, [page, fetchCategories, setCategoriesLoaded])

  useEffect(() => {
    if (categories && categories.data && categories.data.length > 0) {
      const fetchedCategories = categories.data.map((category) => ({
        title: category.name,
        value: category._id,
        appearance: category.appearance
      }))
      setVisibleCategories((prev) =>
        page === 1 ? fetchedCategories : [...prev, ...fetchedCategories]
      )
      setTotalPages(categories.totalPages || 1)
    }
  }, [categories, categoriesError, page])

  const { response: subcategories, fetchData: fetchSubcategories } =
    useSubjectsStepper({
      category: selectedCategory?.value,
      fetchOnMount: false,
      transform: (data) => {
        return data.map((subject) => {
          return {
            title: subject.name,
            value: subject.category || 'unknown'
          }
        })
      }
    })

  useEffect(() => {
    if (selectedCategory?.value) {
      fetchSubcategories()
    }
  }, [selectedCategory, fetchSubcategories])

  const handleCategoryChange = useCallback((newValue) => {
    setSelectedCategory(newValue)
    setSelectedSubject(null)
  }, [])

  const handleSubjectChange = useCallback((newValue) => {
    setSelectedSubject(newValue?.title || null)
  }, [])

  const handleButtonClick = () => {
    if (
      selectedSubject &&
      !subjects.some((subject) => subject.name === selectedSubject)
    ) {
      const newSubject = {
        name: selectedSubject,
        categoryId: selectedCategory?.value || null
      }
      const updatedSubjects = [...subjects, newSubject]
      handleStepData(subjectLabel, updatedSubjects)
      setSelectedCategory(null)
      setSelectedSubject(null)
    } else {
      console.log('No subject selected or subject already added')
    }
  }

  const handleChipDelete = (item) => {
    const updatedSubjects = subjects.filter((subject) => subject.name !== item)
    handleStepData(subjectLabel, updatedSubjects)
  }

  const handleScroll = useCallback(
    (event) => {
      const listbox = event.currentTarget
      const isAtBottom =
        listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10
      if (isAtBottom && page < totalPages) {
        setPage((prev) => prev + 1)
      }
    },
    [page, totalPages]
  )

  const memoizedVisibleCategories = useMemo(
    () => visibleCategories,
    [visibleCategories]
  )
  const memoizedSubcategories = useMemo(() => subcategories, [subcategories])

  return (
    <Box sx={styles.step}>
      <Typography
        aria-label={t('common.categoryStep.title')}
        component='h2'
        sx={styles.body2}
      >
        {t('common.categoryStep.title')}
      </Typography>

      <Box sx={styles.container}>
        <Box sx={styles.containerImg}>
          <Box
            alt='study category'
            component='img'
            src={studyCategoryImg}
            sx={styles.img}
          />
        </Box>

        <Box sx={styles.content}>
          <Box sx={styles.autocompletes}>
            <AppAutoCompleteCategories
              ListboxProps={{
                style: { maxHeight: '140px' },
                onScroll: handleScroll
              }}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(_event, newValue) => handleCategoryChange(newValue)}
              options={memoizedVisibleCategories}
              textFieldProps={{
                label: t('common.categoryStep.labelCategory'),
                variant: 'outlined'
              }}
              value={
                memoizedVisibleCategories.find(
                  (option) => option.value === selectedCategory?.value
                ) || null
              }
            />
            <AppAutoCompleteCategories
              ListboxProps={{ style: { maxHeight: '140px' } }}
              disabled={!selectedCategory}
              getOptionLabel={(option) => option.title}
              hideClearIcon={false}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(_event, newValue) => handleSubjectChange(newValue)}
              options={memoizedSubcategories}
              textFieldProps={{
                label: t('common.categoryStep.labelSubject'),
                variant: 'outlined'
              }}
              value={
                memoizedSubcategories.find(
                  (option) => option.title === selectedSubject
                ) || null
              }
            />

            <AppButton disabled={!selectedSubject} onClick={handleButtonClick}>
              {t('common.categoryStep.buttonText')}
            </AppButton>

            <AppChiplistCategory
              defaultQuantity={3}
              getLabel={(subject) => subject.name}
              handleChipDelete={handleChipDelete}
              items={subjects}
              sx={styles.chipListWrapper}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={styles.btnsBox}>{btnsBox}</Box>
    </Box>
  )
}

export default SubjectsStep
