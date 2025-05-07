import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import axios from 'axios'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useAppSelector } from '~/hooks/use-redux'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { categoryService } from '~/services/category-service'
import { useModalContext } from '~/context/modal-context'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'
import DirectionLink from '~/components/direction-link/DirectionLink'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { getOpositeRole } from '~/utils/helper-functions'
import { mapArrayByField } from '~/utils/map-array-by-field'

import {
  CategoryNameInterface,
  SizeEnum,
  SubjectInterface,
  SubjectNameInterface
} from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/subjects/Subjects.styles'

interface SubjectApiResponse {
  data: { _id: string; name: string }[]
}

const Subjects = () => {
  const [match, setMatch] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [subjects, setSubjects] = useState<SubjectInterface[]>([])
  const [subjectsLoading, setSubjectsLoading] = useState<boolean>(false)

  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''

  const oppositeRole = getOpositeRole(userRole) || 'tutor'

  const transform = useCallback(
    (data: SubjectNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )

  const {
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    transform
  })

  const getSubjectNames = () => {
    if (!isFetched) {
      void fetchData()
      setIsFetched(true)
    }
  }

  const fetchSubjects = useCallback(async () => {
    if (!categoryId) {
      console.warn('categoryId is empty, setting empty subjects')
      setSubjects([])
      return
    }
    setSubjectsLoading(true)
    try {
      const response = await axios.get<SubjectApiResponse>(
        `http://localhost:8080/categories/${categoryId}/subjects/names`,
        {
          withCredentials: true
        }
      )
      console.log('Server response:', response.data)

      if (!response.data || !Array.isArray(response.data.data)) {
        console.warn(
          'Server returned empty or invalid response:',
          response.data
        )
        setSubjects([])
        return
      }

      const items: SubjectInterface[] = response.data.data.map(
        (item: { _id: string; name: string }) => ({
          _id: item._id,
          name: item.name,
          totalOffers: { [oppositeRole]: 0 }
        })
      )

      setSubjects(items)
    } catch (error) {
      console.error('Error fetching subjects:', error)
      setSubjects([])
    } finally {
      setSubjectsLoading(false)
    }
  }, [categoryId, oppositeRole])

  useEffect(() => {
    void fetchSubjects()
  }, [fetchSubjects])

  const resetData = () => {
    setSubjects([])
    setMatch('')
  }

  const cards = useMemo(
    () =>
      subjects.length > 0
        ? subjects.map((item: SubjectInterface) => ({
            _id: item._id,
            description: `${item.totalOffers[oppositeRole]} ${t('categoriesPage.offers')}`,
            img: serviceIcon,
            link: `${authRoutes.categories.path}?categoryId=${categoryId}&subjectId=${item._id}`,
            title: item.name
          }))
        : [],
    [subjects, categoryId, oppositeRole, t]
  )

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setIsFetched(false)
    searchParams.set('categoryId', value?._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
    resetData()
  }

  const onResponseCategory = (response: CategoryNameInterface[]) => {
    const category = response.find((option) => option._id === categoryId)
    setCategoryName(category?.name ?? '')
  }

  const autoCompleteCategories = (
    <AsyncAutocomplete
      axiosProps={{ onResponse: onResponseCategory }}
      labelField='name'
      onChange={onCategoryChange}
      service={categoryService.getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.categories')
      }}
      value={categoryId}
      valueField='_id'
    />
  )

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('subjectsPage.subjects.description')}
        style={styles.titleWithDescription}
        title={t('subjectsPage.subjects.title', { category: categoryName })}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        <SearchAutocomplete
          loading={subjectNamesLoading}
          onFocus={getSubjectNames}
          onSearchChange={() => setSubjects([])}
          options={subjectsNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {breakpoints.isMobile && autoCompleteCategories}
      {!subjects.length && !subjectsLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subjects' })}
          description={t('errorMessages.tryAgainText', { name: 'subjects' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards.map((card) => ({
            ...card,
            link: `/categories/subjects/find-offers?categoryId=${categoryId}&subjectId=${card._id}`
          }))}
          isExpandable={false}
          loading={subjectsLoading}
          onClick={() => {}}
        />
      )}
    </PageWrapper>
  )
}

export default Subjects
