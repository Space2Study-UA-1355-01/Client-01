import { useCallback, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStepContext } from '~/context/step-context'
import AppAutoCompleteCategories from '~/components/app-autocomplete-categories/AppAutoCompleteCategories'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import studyCategoryImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from './SubjectsStep.styles'

export const categoriesMock = [
  { title: 'History', value: 'history' },
  { title: 'Mathematics', value: 'mathematics' },
  { title: 'Physics', value: 'physics' },
  { title: 'Chemistry', value: 'chemistry' },
  { title: 'Literature', value: 'literature' },
  { title: 'Economics', value: 'economics' }
]

export const subjectsMock = {
  history: [
    { title: 'Ancient History', value: 'ancient_history' },
    { title: 'Medieval History', value: 'medieval_history' },
    { title: 'Modern History', value: 'modern_history' },
    { title: 'World War II', value: 'world_war_ii' },
    { title: 'American History', value: 'american_history' },
    { title: 'European History', value: 'european_history' }
  ],
  mathematics: [
    { title: 'Algebra', value: 'algebra' },
    { title: 'Calculus', value: 'calculus' },
    { title: 'Geometry', value: 'geometry' },
    { title: 'Statistics', value: 'statistics' },
    { title: 'Number Theory', value: 'number_theory' },
    { title: 'Differential Equations', value: 'differential_equations' }
  ],
  physics: [
    { title: 'Mechanics', value: 'mechanics' },
    { title: 'Electromagnetism', value: 'electromagnetism' },
    { title: 'Thermodynamics', value: 'thermodynamics' },
    { title: 'Quantum Physics', value: 'quantum_physics' },
    { title: 'Optics', value: 'optics' },
    { title: 'Relativity', value: 'relativity' }
  ],
  chemistry: [
    { title: 'Organic Chemistry', value: 'organic_chemistry' },
    { title: 'Inorganic Chemistry', value: 'inorganic_chemistry' },
    { title: 'Physical Chemistry', value: 'physical_chemistry' },
    { title: 'Biochemistry', value: 'biochemistry' },
    { title: 'Analytical Chemistry', value: 'analytical_chemistry' },
    { title: 'Environmental Chemistry', value: 'environmental_chemistry' }
  ],
  literature: [
    { title: 'Classical Literature', value: 'classical_literature' },
    { title: 'Modern Literature', value: 'modern_literature' },
    { title: 'Poetry', value: 'poetry' },
    { title: 'Drama', value: 'drama' },
    { title: 'American Literature', value: 'american_literature' },
    { title: 'World Literature', value: 'world_literature' }
  ],
  economics: [
    { title: 'Microeconomics', value: 'microeconomics' },
    { title: 'Macroeconomics', value: 'macroeconomics' },
    { title: 'International Economics', value: 'international_economics' },
    { title: 'Behavioral Economics', value: 'behavioral_economics' },
    { title: 'Development Economics', value: 'development_economics' },
    { title: 'Financial Economics', value: 'financial_economics' }
  ]
}

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const subjectLabel = 'subjects'
  const subjects = Array.isArray(stepData[subjectLabel])
    ? stepData[subjectLabel]
    : []

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [visibleCategories, setVisibleCategories] = useState(
    categoriesMock.slice(0, 4)
  )
  const [page, setPage] = useState(1)

  const categoriesPerPage = 4

  const subcategories = selectedCategory
    ? subjectsMock[selectedCategory] || []
    : []

  const handleCategoryChange = (newValue) => {
    setSelectedCategory(newValue?.value || null)
    setSelectedSubject(null)
  }

  const handleSubjectChange = (newValue) => {
    setSelectedSubject(newValue?.title || null)
  }

  const handleButtonClick = () => {
    if (selectedSubject) {
      const updatedSubjects = [...subjects, selectedSubject]
      handleStepData(subjectLabel, updatedSubjects)
      setSelectedCategory(null)
      setSelectedSubject(null)
    } else {
      console.log('No subject selected')
    }
  }

  const handleChipDelete = (item) => {
    const updatedSubjects = subjects.filter((subject) => subject !== item)
    handleStepData(subjectLabel, updatedSubjects, {})
  }

  const handleScroll = useCallback(
    (event) => {
      const listbox = event.currentTarget
      const isAtBottom =
        listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10

      if (isAtBottom && visibleCategories.length < categoriesMock.length) {
        const nextPage = page + 1
        const newCategories = categoriesMock.slice(
          0,
          nextPage * categoriesPerPage
        )
        setVisibleCategories(newCategories)
        setPage(nextPage)
      }
    },
    [page, visibleCategories.length]
  )

  useEffect(() => {
    setVisibleCategories(categoriesMock.slice(0, categoriesPerPage))
    setPage(1)
  }, [])

  return (
    <Box sx={styles.step}>
      <Typography component='h2' sx={styles.body2}>
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
            {categoriesMock.length > 0 ? (
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
                options={visibleCategories}
                textFieldProps={{
                  label: 'Main Tutoring Category',
                  variant: 'outlined'
                }}
                value={
                  categoriesMock.find(
                    (option) => option.value === selectedCategory
                  ) || null
                }
              />
            ) : (
              <p>No categories</p>
            )}

            <AppAutoCompleteCategories
              ListboxProps={{ style: { maxHeight: '140px' } }}
              disabled={!selectedCategory}
              getOptionLabel={(option) => option.title}
              hideClearIcon={false}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(_event, newValue) => handleSubjectChange(newValue)}
              options={subcategories}
              textFieldProps={{ label: 'Subject', variant: 'outlined' }}
              value={
                subcategories.find(
                  (option) => option.value === selectedSubject
                ) || null
              }
            />

            <AppButton disabled={!selectedSubject} onClick={handleButtonClick}>
              {t('common.categoryStep.buttonText')}
            </AppButton>

            <AppChipList
              defaultQuantity={3}
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
