import { useEffect, useMemo, useState } from 'react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import OfferCardsList from '~/containers/find-offer/offer-cards-list/OfferCardsList'
import PopularCategories from '~/containers/find-offer/popular-categories/PopularCategories'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { Box } from '@mui/material'

import {
  CategoryNameInterface,
  SizeEnum,
  SubjectNameInterface,
  Offer
} from '~/types'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useTranslation } from 'react-i18next'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from './FindOffers.styles'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useSearchParams } from 'react-router-dom'
import { categoryService } from '~/services/category-service'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { subjectService } from '~/services/subject-service'
import useBreakpoints from '~/hooks/use-breakpoints'
import { offerService, GetOffersParams } from '~/services/offer-service'
import useAxios from '~/hooks/use-axios'

const FindOffers = () => {
  const [tutorName, setTutorName] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''

  const [isGridView, setIsGridView] = useState(true)

  const { t } = useTranslation()
  const breakpoints = useBreakpoints()

  const subjectFetchService = useMemo(() => {
    if (categoryId && categoryId !== '') {
      return () => subjectService.getSubjects(undefined, categoryId)
    }
    return () => subjectService.getAllSubjects({ limit: 99 })
  }, [categoryId])

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    if (!value) {
      searchParams.delete('categoryId')
      setSearchParams(searchParams)
      return
    }
    searchParams.set('categoryId', value._id)
    searchParams.delete('subjectId')
    setSearchParams(searchParams)
  }
  const onSubjectChange = (
    _: React.SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    if (!value) {
      searchParams.delete('subjectId')
      setSearchParams(searchParams)
      return
    }
    searchParams.set('subjectId', value._id)
    searchParams.set('categoryId', value?.category?._id ?? categoryId)
    setSearchParams(searchParams)
  }

  const {
    response: offers,
    loading,
    error,
    fetchData
  } = useAxios<{ items: Offer[]; count: number }, GetOffersParams, Offer[]>({
    service: offerService.getOffers,
    defaultResponse: [],
    fetchOnMount: false,
    transform: (res) => res.items
  })

  const params = useMemo<GetOffersParams>(() => {
    const p: GetOffersParams = {}
    if (categoryId) p.categoryId = categoryId
    if (subjectId) p.subjectId = subjectId
    if (tutorName.trim()) p.search = tutorName.trim()
    return p
  }, [subjectId, categoryId, tutorName])

  useEffect(() => {
    void fetchData(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const autoCompleteSubjects = (
    <AsyncAutocomplete
      labelField='name'
      onChange={onSubjectChange}
      service={subjectFetchService}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.subjects')
      }}
      value={subjectId}
      valueField='_id'
    />
  )

  const autoCompleteCategories = (
    <AsyncAutocomplete
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

  return (
    <PageWrapper maxWidth='lg'>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('findOffers.backToAllCategories')}
        />
        <DirectionLink linkTo='' title='' />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        {!breakpoints.isMobile && autoCompleteSubjects}
        <SearchAutocomplete
          loading={false}
          options={[]}
          search={tutorName || ''}
          setSearch={setTutorName}
          textFieldProps={{
            label: t('findOffers.searchToolbar.label')
          }}
        />
      </AppToolbar>
      {breakpoints.isMobile && autoCompleteCategories}
      {breakpoints.isMobile && autoCompleteSubjects}

      <ViewSwitcher isGridView={isGridView} setIsGridView={setIsGridView} />
      <OfferCardsList
        error={error}
        isGridView={isGridView}
        loading={loading}
        offers={offers}
      />
        <PopularCategories limit={9} />
    </PageWrapper>
  )
}
export default FindOffers
