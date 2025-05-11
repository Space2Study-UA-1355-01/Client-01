import { useEffect, useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DefaultCategoryIcon from '@mui/icons-material/Category'

import { styles } from '~/pages/categories/Categories.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import useCategoriesNames from '~/hooks/use-categories-names'
import { axiosClient } from '~/plugins/axiosClient'
import { useModalContext } from '~/context/modal-context'

import { CategoryNameInterface, SizeEnum, CategoryInterface } from '~/types'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import CardsList from '~/components/cards-list/CardsList'
import { CardWithLinkProps } from '~/components/card-with-link/CardWithLink'
import { CategoryIconsMap } from '~/components/category-card/Icons'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

import { getNameById, getIdByName } from '~/utils/helper-functions'

const getAccessTokenFromCookie = () => {
  const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/)
  return match ? match[1] : ''
}

const LIMIT = 6
const apiPath = import.meta.env.VITE_API_BASE_PATH
const clientPath = 'http://localhost:3000'

const Categories = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategoryId = searchParams.get('id') || ''
  const [isFetched, setIsFetched] = useState(false)

  const [cards, setCards] = useState<CardWithLinkProps[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { openModal } = useModalContext()
  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })
  const [invalidSearch, setInvalidSearch] = useState(false)

  const fetchCategories = useCallback(
    async (pageToLoad = 1) => {
      setLoading(true)
      try {
        const headers = {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`
        }

        let data: CategoryInterface[] = []
        if (selectedCategoryId) {
          const res = await axiosClient.get<CategoryInterface>(
            `${apiPath}/categories/${selectedCategoryId}`,
            { headers }
          )
          data = [res.data]
          setHasMore(false)
        } else {
          const res = await axiosClient.get<{
            data: CategoryInterface[]
            totalPages: number
          }>(`${apiPath}/categories?page=${pageToLoad}&limit=${LIMIT}`, {
            headers
          })
          data = res.data.data
          const isLastPage = pageToLoad >= res.data.totalPages
          setHasMore(!isLastPage)
        }

        const transformed = data.map(
          (card: CategoryInterface): CardWithLinkProps => ({
            _id: card._id,
            name: card.name,
            icon: CategoryIconsMap[card.name] || DefaultCategoryIcon,
            description: `${Number(card.totalOffers)} Offers`,
            link: `${clientPath}/categories/subjects?categoryId=${card._id}`,
            appearance: card.appearance
          })
        )

        setCards((prev) =>
          pageToLoad === 1 || selectedCategoryId
            ? transformed
            : [...prev, ...transformed]
        )
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    },
    [selectedCategoryId]
  )

  useEffect(() => {
    setCards([])
    setPage(1)
    void fetchCategories(1)
  }, [fetchCategories, selectedCategoryId])

  const handleLoadMore = () => {
    if (!hasMore || loading) return
    const nextPage = page + 1
    setPage(nextPage)
    void fetchCategories(nextPage)
  }

  const showLoadMoreButton = !selectedCategoryId && hasMore && cards.length > 0

  const transform: (
    data: CategoryNameInterface[] | { data: CategoryNameInterface[] }
  ) => CategoryNameInterface[] = (res) => (Array.isArray(res) ? res : res.data)

  const {
    loading: categoriesNamesLoading,
    response: categoriesNamesItems,
    fetchData
  } = useCategoriesNames<CategoryNameInterface>({
    fetchOnMount: false,
    transform
  })

  const options: string[] = useMemo(
    () => categoriesNamesItems.map((item) => item.name),
    [categoriesNamesItems]
  )

  const search = getNameById(categoriesNamesItems, selectedCategoryId)

  useEffect(() => {
    if (selectedCategoryId && !isFetched) {
      void fetchData()
      setIsFetched(true)
    }
  }, [selectedCategoryId, fetchData, isFetched])

  const updateSearchParams = (value: string): void => {
    const itemId = getIdByName(categoriesNamesItems, value)

    if (value) {
      if (itemId) {
        setInvalidSearch(false)
        searchParams.set('id', itemId)
      } else {
        setInvalidSearch(true)
        searchParams.set('id', '')
      }
      setSearchParams(searchParams)
    } else {
      setInvalidSearch(false)
      searchParams.delete('id')
      setSearchParams(searchParams)
    }
  }

  const handleAutocompleteFocus = (): void => {
    if (!isFetched) {
      void fetchData()
      setIsFetched(true)
    }
  }

  return (
    <PageWrapper maxWidth='lg'>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <Box sx={styles.navigation}>
        <DirectionLink linkTo='' title='' />
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>

      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoriesNamesLoading}
          onFocus={handleAutocompleteFocus}
          options={options}
          search={search}
          setSearch={updateSearchParams}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      {invalidSearch ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'categories' })}
          description={t('errorMessages.tryAgainText', { name: 'categories' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={showLoadMoreButton}
          loading={loading}
          onClick={handleLoadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
