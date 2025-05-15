import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StarIcon from '@mui/icons-material/Star'

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
import { icons } from '~/components/subject-card-icon/icons'
import { CardWithLinkProps } from '~/components/card-with-link/CardWithLink'

import useBreakpoints from '~/hooks/use-breakpoints'
import { getOpositeRole } from '~/utils/helper-functions'
import { axiosClient } from '~/plugins/axiosClient'
import {
  CategoryNameInterface,
  SizeEnum,
  SubjectNameInterface,
  CategoryAppearance
} from '~/types'
import {
  SubjectApiResponse,
  SubjectsInterfaceWithIcon
} from '~/types/common/interfaces/common.interfaces'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from './Subjects.styles'

const Subjects = () => {
  const [match, setMatch] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [subjects, setSubjects] = useState<SubjectsInterfaceWithIcon[]>([])
  const [subjectsLoading, setSubjectsLoading] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [isMore, setIsMore] = useState(true)

  const LIMIT = 12

  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('categoryId') ?? ''

  const oppositeRole = getOpositeRole(userRole) || 'tutor'

  const transform: (
    data: SubjectNameInterface[] | { data: SubjectNameInterface[] }
  ) => SubjectNameInterface[] = (res) => (Array.isArray(res) ? res : res.data)

  const {
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    transform
  })

  const getSubjectNames = useCallback(() => {
    if (!isFetched) {
      void fetchData()
      setIsFetched(true)
    }
  }, [fetchData, isFetched])

  const subjectOptions: string[] = useMemo(
    () =>
      categoryId && subjects.length > 0
        ? subjectsNamesItems.map((item) => item.name)
        : [],
    [subjectsNamesItems, categoryId, subjects]
  )

  useEffect(() => {
    if (categoryId) {
      getSubjectNames()
    }
  }, [categoryId, getSubjectNames])

  const fetchSubjects = useCallback(
    async (pageToLoad = 1) => {
      setSubjectsLoading(true)
      try {
        const endpoint = categoryId
          ? `/categories/${categoryId}/subjects`
          : `/subjects`

        const response = await axiosClient.get<SubjectApiResponse>(endpoint, {
          params: { page: pageToLoad, limit: LIMIT }
        })
        console.log('Server response:', response.data)

        if (!response.data || !Array.isArray(response.data.data)) {
          console.warn(
            'Server returned empty or invalid response:',
            response.data
          )
          setSubjects([])
          return
        }

        const items: SubjectsInterfaceWithIcon[] = response.data.data.map(
          (item: {
            _id: string
            name: string
            category: {
              _id: string
              name: string
              appearance: CategoryAppearance
            }
            totalOffers: { student: number; tutor: number }
          }) => ({
            _id: item._id,
            name: item.name,
            icon: icons[item.name] || StarIcon,
            appearance: item.category.appearance,
            totalOffers: item.totalOffers
          })
        )

        setSubjects((prev) => (pageToLoad === 1 ? items : [...prev, ...items]))
        setIsMore(pageToLoad < response.data.totalPages)
      } catch (error) {
        console.error('Error fetching subjects:', error)
        setSubjects([])
      } finally {
        setSubjectsLoading(false)
      }
    },
    [categoryId]
  )

  useEffect(() => {
    setSubjects([])
    setPage(1)
    setIsMore(true)
    void fetchSubjects(1)
  }, [fetchSubjects, categoryId])

  const handleLoadMore = () => {
    if (!isMore || subjectsLoading) return
    const nextPage = page + 1
    setPage(nextPage)
    void fetchSubjects(nextPage)
  }

  const resetData = () => {
    setSubjects([])
    setMatch('')
  }

  const shouldShowLoadMore = useMemo(() => {
    if (!match) return isMore

    const filteredSubjects = subjects.filter((item) =>
      item.name.toLowerCase().includes(match.toLowerCase())
    )

    const isExactMatch = subjectOptions.some(
      (option) => option.toLowerCase() === match.toLowerCase()
    )
    if (isExactMatch && filteredSubjects.length === 1) {
      return false
    }
    return isMore
  }, [match, subjects, subjectOptions, isMore])

  const cards: CardWithLinkProps[] = useMemo(() => {
    let filteredSubjects = match
      ? subjects.filter((item) =>
          item.name.toLowerCase().includes(match.toLowerCase())
        )
      : subjects

    filteredSubjects = filteredSubjects.sort((a, b) => {
      const offersA = a.totalOffers[oppositeRole] || 0
      const offersB = b.totalOffers[oppositeRole] || 0
      return offersB - offersA
    })

    return filteredSubjects.length > 0
      ? filteredSubjects.map((item: SubjectsInterfaceWithIcon) => ({
          _id: item._id,
          icon: item.icon,
          appearance: item.appearance,
          name: item.name,
          description: `${item.totalOffers[oppositeRole]} ${t('categoriesPage.offers')}`,
          link: `/categories/subjects/find-offers?categoryId=${categoryId}&subjectId=${item._id}`
        }))
      : []
  }, [subjects, match, categoryId, oppositeRole, t])

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
    <PageWrapper maxWidth='lg'>
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
          linkTo={authRoutes.findOffers.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        <SearchAutocomplete
          loading={subjectNamesLoading}
          options={subjectOptions}
          search={match || ''}
          setSearch={setMatch}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {breakpoints.isMobile && autoCompleteCategories}
      {(subjects.length === 0 || (cards.length === 0 && match)) &&
      !subjectsLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subjects' })}
          description={t('errorMessages.tryAgainText', { name: 'subjects' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={shouldShowLoadMore}
          loading={subjectsLoading}
          onClick={handleLoadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Subjects
