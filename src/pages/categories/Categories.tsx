import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { styles } from '~/pages/categories/Categories.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import useCategoriesNames from '~/hooks/use-categories-names'

import { CategoryNameInterface, SizeEnum } from '~/types'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'

import { getNameById, getIdByName } from '~/utils/helper-functions'

const Categories = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategoryId = searchParams.get('id') || ''
  const [isFetched, setIsFetched] = useState(false)

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
      const idToSet = itemId || ''
      searchParams.set('id', idToSet)
      setSearchParams(searchParams)
    } else {
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
    <PageWrapper>
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
    </PageWrapper>
  )
}

export default Categories
