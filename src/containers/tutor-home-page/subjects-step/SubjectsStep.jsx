import { useCallback, useEffect, useState, useMemo } from 'react'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
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
  // const subjects = Array.isArray(stepData[subjectLabel])
  //   ? stepData[subjectLabel]
  //   : []
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
    error: categoriesError,
    loading
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

  const {
    response: subcategories,
    error: subjectsError,
    loading: subjectsLoading,
    fetchData: fetchSubcategories
  } = useSubjectsStepper({
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
    // if (selectedSubject && !subjects.includes(selectedSubject)) {
    if (
      selectedSubject &&
      !subjects.some((subject) => subject.name === selectedSubject)
    ) {
      const newSubject = {
        name: selectedSubject,
        categoryId: selectedCategory?.value || null
      }
      //const updatedSubjects = [...subjects, selectedSubject]
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

      {categoriesError && (
        <Alert severity='error'>
          {t('common.categoryStep.errorCategories')}
        </Alert>
      )}
      {subjectsError && (
        <Alert severity='error'>{t('common.categoryStep.errorSubjects')}</Alert>
      )}
      {(loading || subjectsLoading) && <CircularProgress />}

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

// const fetchCategories = useCallback(async (pageNum = 1) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/categories/`, {
//       params: { page: pageNum, limit: categoriesPerPage },
//       withCredentials: true
//     })
//     console.log('Categories response:', response.data)
//     const fetchedCategories = response.data.data.map((category) => ({
//       title: category.name,
//       value: category._id,
//       appearance: category.appearance
//     }))
//     setCategories((prev) =>
//       pageNum === 1 ? fetchedCategories : [...prev, ...fetchedCategories]
//     )
//     setVisibleCategories(fetchedCategories)
//     setTotalPages(response.data.totalPages)
//   } catch (error) {
//     console.error('Categories fetch error:', {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data
//     })
//   }
// }, [])

// useEffect(() => {
//   fetchCategories(page)
// }, [fetchCategories, page])

// const fetchSubcategories = useCallback(async () => {
//   if (!selectedCategory) {
//     setSubcategories([])
//     return
//   }
//   try {
//     const response = await axios.get(
//       `${API_BASE_URL}/categories/${selectedCategory}/subjects/names`,
//       { withCredentials: true }
//     )
//     console.log('Subcategories response:', response.data)
//     const fetchedSubcategories = response.data.data.map((subject) => ({
//       title: subject.name,
//       value: subject._id
//     }))
//     setSubcategories(fetchedSubcategories)
//   } catch (error) {
//     console.error('Subcategories fetch error:', {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data
//     })
//     setSubjectsError(error)
//   }
// }, [selectedCategory])

// useEffect(() => {
//   fetchSubcategories()
// }, [selectedCategory, fetchSubcategories])

// import { useCallback, useEffect, useState } from 'react'
// import { Box, Typography } from '@mui/material'
// import { useTranslation } from 'react-i18next'
// import { useStepContext } from '~/context/step-context'
// import AppAutoCompleteCategories from '~/components/app-autocomplete-categories/AppAutoCompleteCategories'
// import AppButton from '~/components/app-button/AppButton'
// import AppChipList from '~/components/app-chips-list/AppChipList'
// import studyCategoryImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
// import { styles } from './SubjectsStep.styles'
// import useCategoriesNames from '~/hooks/use-categories-names'
// import useSubjectsNames from '~/hooks/use-subjects-names'

// const SubjectsStep = ({ btnsBox }) => {
//   const { t } = useTranslation()
//   const { stepData, handleStepData } = useStepContext()
//   const subjectLabel = 'subjects'
//   const subjects = Array.isArray(stepData[subjectLabel])
//     ? stepData[subjectLabel]
//     : []

//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [selectedSubject, setSelectedSubject] = useState(null)
//   const [page, setPage] = useState(1)
//   const [visibleCategories, setVisibleCategories] = useState([])
//   const [totalPages, setTotalPages] = useState(1)
//   const [categoriesLoaded, setCategoriesLoaded] = useState(false)

//   const categoriesPerPage = 4

//   const {
//     response: categories,
//     fetchData: fetchCategories,
//     error: categoriesError,
//     loading
//   } = useCategoriesNames({
//     fetchOnMount: false
//   })

//   useEffect(() => {
//     console.log('fetchCategories, page:', page)
//     fetchCategories({ page, limit: categoriesPerPage })
//       .then(() => {
//         console.log('Category downloaded')
//         setCategoriesLoaded(true)
//       })
//       .catch((error) => {
//         console.error('Error category download:', {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data
//         })
//       })
//   }, [page, fetchCategories])

//   useEffect(() => {
//     console.log('Update category:', categories?.data)
//     if (categories && categories.data && categories.data.length > 0) {
//       const fetchedCategories = categories.data.map((category) => ({
//         title: category.name,
//         value: category._id,
//         appearance: category.appearance
//       }))
//       console.log('visibleCategories:', fetchedCategories)
//       setVisibleCategories((prev) =>
//         page === 1 ? fetchedCategories : [...prev, ...fetchedCategories]
//       )
//       setTotalPages(categories.totalPages || 1)
//     }
//     if (categoriesError) {
//       console.error('Error category load:', {
//         message: categoriesError.message,
//         status: categoriesError.status,
//         data: categoriesError.data
//       })
//     }
//   }, [categories, categoriesError, page])

//   const { response: subcategories, error: subjectsError } = useSubjectsNames({
//     category: selectedCategory?.value,
//     fetchOnMount: !!selectedCategory && categoriesLoaded,
//     transform: (data) => {
//       console.log('Предметы:', data)
//       if (!selectedCategory?.value) {
//         console.warn('Категория не выбрана для предметов:', data)
//         return [] // Пустой массив, если категория не выбрана
//       }
//       return data.map((subject) => {
//         console.log('Предмет:', subject)
//         return {
//           title: subject.name,
//           value: selectedCategory.value // Всегда ID выбранной категории
//         }
//       })
//     }
//   })

//   useEffect(() => {
//     console.log(
//       'ID категории:',
//       selectedCategory?.value ?? 'Категория не выбрана'
//     )
//     console.log('Подкатегории:', subcategories)
//     console.log('Ошибка предметов:', subjectsError)
//   }, [selectedCategory, subcategories, subjectsError])

//   const handleCategoryChange = (newValue) => {
//     console.log('New category:', newValue)
//     setSelectedCategory(newValue)
//     setSelectedSubject(null)
//   }

//   const handleSubjectChange = (newValue) => {
//     console.log('New subject:', newValue)
//     setSelectedSubject(newValue || null)
//   }

//   const handleButtonClick = () => {
//     if (selectedSubject && selectedCategory) {
//       const updatedSubjects = [
//         ...subjects,
//         {
//           title: selectedSubject.title,
//           categoryId: selectedCategory.value // Use selectedCategory._id directly
//         }
//       ]
//       handleStepData(subjectLabel, updatedSubjects)
//       setSelectedCategory(null)
//       setSelectedSubject(null)
//     } else {
//       console.log('No subject or category selected')
//     }
//   }

//   const handleChipDelete = (item) => {
//     const updatedSubjects = subjects.filter(
//       (subject) =>
//         subject.title !== item.title || subject.categoryId !== item.categoryId
//     )
//     handleStepData(subjectLabel, updatedSubjects)
//   }

//   const handleScroll = useCallback(
//     (event) => {
//       const listbox = event.currentTarget
//       const isAtBottom =
//         listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10
//       if (isAtBottom && page < totalPages) {
//         setPage((prev) => prev + 1)
//       }
//     },
//     [page, totalPages]
//   )

//   const subcategoriesArray = Array.isArray(subcategories)
//     ? subcategories.filter((option) => option.value)
//     : []

//   return (
//     <Box sx={styles.step}>
//       <Typography component='h2' sx={styles.body2}>
//         {t('common.categoryStep.title')}
//       </Typography>

//       {loading && <Box>Загрузка категорий...</Box>}

//       <Box sx={styles.container}>
//         <Box sx={styles.containerImg}>
//           <Box
//             alt='study category'
//             component='img'
//             src={studyCategoryImg}
//             sx={styles.img}
//           />
//         </Box>

//         <Box sx={styles.content}>
//           <Box sx={styles.autocompletes}>
//             <AppAutoCompleteCategories
//               ListboxProps={{
//                 style: { maxHeight: '140px' },
//                 onScroll: handleScroll
//               }}
//               getOptionLabel={(option) => option.title}
//               isOptionEqualToValue={(option, value) =>
//                 option.value === value.value
//               }
//               onChange={(_event, newValue) => handleCategoryChange(newValue)}
//               options={visibleCategories}
//               textFieldProps={{
//                 label: t('common.categoryStep.mainCategoryLabel'),
//                 variant: 'outlined'
//               }}
//               value={selectedCategory || null}
//             />
//             <AppAutoCompleteCategories
//               ListboxProps={{ style: { maxHeight: '140px' } }}
//               disabled={!selectedCategory || !categoriesLoaded}
//               getOptionLabel={(option) => option.title}
//               hideClearIcon={false}
//               isOptionEqualToValue={(option, value) =>
//                 option.value === value?.value
//               }
//               onChange={(_event, newValue) => handleSubjectChange(newValue)}
//               options={subcategoriesArray}
//               textFieldProps={{
//                 label: t('common.categoryStep.subjectLabel'),
//                 variant: 'outlined'
//               }}
//               value={selectedSubject || null}
//             />
//             {subjectsError && (
//               <Typography color='error'>
//                 {t('common.categoryStep.subjectsError') ||
//                   'Subjects not download'}
//               </Typography>
//             )}
//             {!subcategoriesArray.length &&
//               selectedCategory &&
//               !subjectsError && (
//                 <Typography>No subjects for this category</Typography>
//               )}
//             <AppButton disabled={!selectedSubject} onClick={handleButtonClick}>
//               {t('common.categoryStep.buttonText')}
//             </AppButton>
//             <AppChipList
//               defaultQuantity={3}
//               handleChipDelete={handleChipDelete}
//               items={subjects}
//               sx={styles.chipListWrapper}
//               getChipLabel={(item) => item.title}
//             />
//           </Box>
//         </Box>
//       </Box>
//       <Box sx={styles.btnsBox}>{btnsBox}</Box>
//     </Box>
//   )
// }

// export default SubjectsStep

// import { useCallback, useEffect, useState } from 'react'
// import { Box, Typography } from '@mui/material'
// import { useTranslation } from 'react-i18next'
// import { useStepContext } from '~/context/step-context'
// import AppAutoCompleteCategories from '~/components/app-autocomplete-categories/AppAutoCompleteCategories'
// import AppButton from '~/components/app-button/AppButton'
// import AppChipList from '~/components/app-chips-list/AppChipList'
// import studyCategoryImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
// import { styles } from './SubjectsStep.styles'
// import axios from 'axios'
// import useCategoriesNames from '~/hooks/use-categories-names'

// const SubjectsStep = ({ btnsBox }) => {
//   const { t } = useTranslation()
//   const { stepData, handleStepData } = useStepContext()
//   const subjectLabel = 'subjects'
//   const subjects = Array.isArray(stepData[subjectLabel])
//     ? stepData[subjectLabel]
//     : []

//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [selectedSubject, setSelectedSubject] = useState(null)
//   //const [categories, setCategories] = useState([])
//   const [subcategories, setSubcategories] = useState([])
//   const [visibleCategories, setVisibleCategories] = useState([])
//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)

//   const categoriesPerPage = 4
//   const API_BASE_URL =
//     import.meta.env.VITE_API_BASE_PATH || 'http://localhost:8080'

//   const fetchCategories = useCallback(async (pageNum = 1) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/categories/`, {
//         params: { page: pageNum, limit: categoriesPerPage },
//         withCredentials: true
//       })
//       console.log('Categories response:', response.data)
//       const fetchedCategories = response.data.data.map((category) => ({
//         title: category.name,
//         value: category._id,
//         appearance: category.appearance
//       }))
//       setCategories((prev) =>
//         pageNum === 1 ? fetchedCategories : [...prev, ...fetchedCategories]
//       )
//       setVisibleCategories(fetchedCategories)
//       setTotalPages(response.data.totalPages)
//     } catch (error) {
//       console.error('Categories fetch error:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data
//       })
//     }
//   }, [])

//   useEffect(() => {
//     fetchCategories(page)
//   }, [fetchCategories, page])

//   const fetchSubcategories = useCallback(async () => {
//     if (!selectedCategory) {
//       setSubcategories([])
//       return
//     }
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/categories/${selectedCategory}/subjects/names`,
//         { withCredentials: true }
//       )
//       console.log('Subcategories response:', response.data)
//       const fetchedSubcategories = response.data.data.map((subject) => ({
//         title: subject.name,
//         value: subject._id
//       }))
//       setSubcategories(fetchedSubcategories)
//     } catch (error) {
//       console.error('Subcategories fetch error:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data
//       })
//       setSubjectsError(error)
//     }
//   }, [selectedCategory])

//   useEffect(() => {
//     fetchSubcategories()
//   }, [selectedCategory, fetchSubcategories])

//   const handleCategoryChange = (newValue) => {
//     setSelectedCategory(newValue?.value || null)
//     setSelectedSubject(null)
//   }

//   const handleSubjectChange = (newValue) => {
//     setSelectedSubject(newValue?.title || null)
//   }

//   const handleButtonClick = () => {
//     if (selectedSubject) {
//       const updatedSubjects = [...subjects, selectedSubject]
//       handleStepData(subjectLabel, updatedSubjects)
//       setSelectedCategory(null)
//       setSelectedSubject(null)
//     } else {
//       console.log('No subject selected')
//     }
//   }

//   const handleChipDelete = (item) => {
//     const updatedSubjects = subjects.filter((subject) => subject !== item)
//     handleStepData(subjectLabel, updatedSubjects)
//   }

//   const handleScroll = useCallback(
//     (event) => {
//       const listbox = event.currentTarget
//       const isAtBottom =
//         listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10

//       if (isAtBottom && page < totalPages) {
//         setPage((prev) => prev + 1)
//       }
//     },
//     [page, totalPages]
//   )

//   return (
//     <Box sx={styles.step}>
//       <Typography component='h2' sx={styles.body2}>
//         {t('common.categoryStep.title')}
//       </Typography>

//       <Box sx={styles.container}>
//         <Box sx={styles.containerImg}>
//           <Box
//             alt='study category'
//             component='img'
//             src={studyCategoryImg}
//             sx={styles.img}
//           />
//         </Box>

//         <Box sx={styles.content}>
//           <Box sx={styles.autocompletes}>
//               <AppAutoCompleteCategories
//                 ListboxProps={{
//                   style: { maxHeight: '140px' },
//                   onScroll: handleScroll
//                 }}
//                 getOptionLabel={(option) => option.title}
//                 isOptionEqualToValue={(option, value) =>
//                   option.value === value.value
//                 }
//                 onChange={(_event, newValue) => handleCategoryChange(newValue)}
//                 options={visibleCategories}
//                 textFieldProps={{
//                   label: t('common.categoryStep.mainCategoryLabel'),
//                   //Main Tutoring Category
//                   variant: 'outlined'
//                 }}
//                 value={
//                   categories.find(
//                     (option) => option.value === selectedCategory
//                   ) || null
//                 }
//               />
//             <AppAutoCompleteCategories
//               ListboxProps={{ style: { maxHeight: '140px' } }}
//               disabled={!selectedCategory}
//               getOptionLabel={(option) => option.title}
//               hideClearIcon={false}
//               isOptionEqualToValue={(option, value) =>
//                 option.value === value.value
//               }
//               onChange={(_event, newValue) => handleSubjectChange(newValue)}
//               options={subcategories}
//               textFieldProps={{
//                 label: t('common.categoryStep.subjectLabel'),
//                 // Subject
//                 variant: 'outlined'
//               }}
//               value={
//                 subcategories.find(
//                   (option) => option.value === selectedSubject
//                 ) || null
//               }
//             />

//             <AppButton disabled={!selectedSubject} onClick={handleButtonClick}>
//               {t('common.categoryStep.buttonText')}
//             </AppButton>

//             <AppChipList
//               defaultQuantity={3}
//               handleChipDelete={handleChipDelete}
//               items={subjects}
//               sx={styles.chipListWrapper}
//             />
//           </Box>
//         </Box>
//       </Box>
//       <Box sx={styles.btnsBox}>{btnsBox}</Box>
//     </Box>
//   )
// }

// export default SubjectsStep

//   // Fetch categories from /categories
//   const {
//     loading: categoriesLoading,
//     response: categories,
//     error: categoriesError
//   } = useCategoriesNames({
//     fetchOnMount: true
//   })

//   // Debug categories fetch
//   useEffect(() => {
//     if (categoriesError) {
//       console.error(
//         'Categories fetch error:',
//         categoriesError.message,
//         categoriesError
//       )
//     }
//     if (categories) {
//       console.log('Categories fetched:', categories)
//     }
//   }, [categories, categoriesError])

//   // Fetch subcategories based on selected category
//   const getSubjectsNames = useCallback(() => {
//     if (
//       !selectedCategory ||
//       !selectedCategory._id ||
//       typeof selectedCategory._id !== 'string'
//     ) {
//       console.warn(
//         'Invalid category ID for subcategories fetch:',
//         selectedCategory?._id
//       )
//       return Promise.resolve({ data: [] })
//     }
//     console.log('Fetching subcategories for category ID:', selectedCategory._id)
//     return subjectService.getSubjectsNames(selectedCategory._id)
//   }, [selectedCategory])

//   const {
//     loading: subjectsLoading,
//     response: subcategories,
//     error: subjectsError,
//     fetchData: fetchSubcategories
//   } = useAxios({
//     service: getSubjectsNames,
//     fetchOnMount: false,
//     defaultResponse: []
//   })

//   // Debug subcategories fetch
//   useEffect(() => {
//     if (subjectsError) {
//       console.error(
//         'Subcategories fetch error:',
//         subjectsError.message,
//         subjectsError
//       )
//     }
//     if (subcategories) {
//       console.log('Subcategories fetched:', subcategories)
//     }
//   }, [subcategories, subjectsError])

//   // Update visible categories when categories are fetched
//   useEffect(() => {
//     if (categories?.length > 0) {
//       setVisibleCategories(categories.slice(0, categoriesPerPage))
//     }
//   }, [categories])

//   // Fetch subcategories when a category is selected
//   useEffect(() => {
//     if (selectedCategory && selectedCategory._id) {
//       fetchSubcategories()
//     }
//   }, [selectedCategory, fetchSubcategories])

//   const handleCategoryChange = (newValue) => {
//     setSelectedCategory(newValue)
//     setSelectedSubject(null)
//   }

//   const handleSubjectChange = (newValue) => {
//     setSelectedSubject(newValue)
//   }

//   const handleButtonClick = () => {
//     if (selectedSubject && selectedSubject.name) {
//       const updatedSubjects = [...subjects, selectedSubject.name]
//       handleStepData(subjectLabel, updatedSubjects)
//       setSelectedCategory(null)
//       setSelectedSubject(null)
//     } else {
//       console.log('No subject selected or invalid subject name')
//     }
//   }

//   const handleChipDelete = (item) => {
//     const updatedSubjects = subjects.filter((subject) => subject !== item)
//     handleStepData(subjectLabel, updatedSubjects, {})
//   }

//   const handleScroll = useCallback(
//     (event) => {
//       const listbox = event.currentTarget
//       const isAtBottom =
//         listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10

//       if (isAtBottom && visibleCategories.length < (categories?.length || 0)) {
//         const nextPage = page + 1
//         const newCategories =
//           categories?.slice(0, nextPage * categoriesPerPage) || []
//         setVisibleCategories(newCategories)
//         setPage(nextPage)
//       }
//     },
//     [page, visibleCategories.length, categories]
//   )

//   if (categoriesLoading) {
//     return <Typography>Loading categories...</Typography>
//   }

//   if (categoriesError) {
//     return (
//       <Typography>
//         Error loading categories:{' '}
//         {categoriesError.message ||
//           'Failed to fetch categories from /categories'}
//       </Typography>
//     )
//   }

//   if (subjectsError && selectedCategory) {
//     return (
//       <Typography>
//         Error loading subjects:{' '}
//         {subjectsError.message || 'Failed to fetch subjects for category'}
//       </Typography>
//     )
//   }

//   return (
//     <Box sx={styles.step}>
//       <Typography component='h2' sx={styles.body2}>
//         {t('common.categoryStep.title')}
//       </Typography>

//       <Box sx={styles.container}>
//         <Box sx={styles.containerImg}>
//           <Box
//             alt='study category'
//             component='img'
//             src={studyCategoryImg}
//             sx={styles.img}
//           />
//         </Box>

//         <Box sx={styles.content}>
//           <Box sx={styles.autocompletes}>
//             {categories?.length > 0 ? (
//               <AppAutoCompleteCategories
//                 ListboxProps={{
//                   style: { maxHeight: '140px' },
//                   onScroll: handleScroll
//                 }}
//                 getOptionLabel={(option) => option.name || ''}
//                 isOptionEqualToValue={(option, value) =>
//                   option._id === value._id
//                 }
//                 onChange={(_event, newValue) => handleCategoryChange(newValue)}
//                 options={visibleCategories}
//                 textFieldProps={{
//                   label: 'Main Tutoring Category',
//                   variant: 'outlined'
//                 }}
//                 value={selectedCategory || null}
//               />
//             ) : (
//               <Typography>No categories available</Typography>
//             )}

//             <AppAutoCompleteCategories
//               ListboxProps={{ style: { maxHeight: '140px' } }}
//               disabled={!selectedCategory || subjectsLoading}
//               getOptionLabel={(option) => option.name || ''}
//               hideClearIcon={false}
//               isOptionEqualToValue={(option, value) => option._id === value._id}
//               onChange={(_event, newValue) => handleSubjectChange(newValue)}
//               options={subcategories}
//               textFieldProps={{ label: 'Subject', variant: 'outlined' }}
//               value={selectedSubject || null}
//             />

//             <AppButton
//               disabled={!selectedSubject || subjectsLoading}
//               onClick={handleButtonClick}
//             >
//               {t('common.categoryStep.buttonText')}
//             </AppButton>

//             <AppChipList
//               defaultQuantity={3}
//               handleChipDelete={handleChipDelete}
//               items={subjects}
//               sx={styles.chipListWrapper}
//             />
//           </Box>
//         </Box>
//       </Box>
//       <Box sx={styles.btnsBox}>{btnsBox}</Box>
//     </Box>
//   )
// }

// export default SubjectsStep
