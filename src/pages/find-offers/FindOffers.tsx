import { useState } from 'react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import OfferCardsList from '~/containers/find-offer/offer-cards-list/OfferCardsList'
import PopularCategories from '~/containers/find-offer/popular-categories/PopularCategories'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'

const FindOffers = () => {
  const [isGridView, setIsGridView] = useState(true)

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <ViewSwitcher isGridView={isGridView} setIsGridView={setIsGridView} />
      <OfferCardsList isGridView={isGridView} />
      <PopularCategories limit={9} />
    </PageWrapper>
  )
}

export default FindOffers
