import { useState } from 'react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import OfferCardsList from '~/containers/find-offer/offer-cards-list/OfferCardsList'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'

const FindOffers = () => {
  const [isGridView, setIsGridView] = useState(true)

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <ViewSwitcher isGridView={isGridView} setIsGridView={setIsGridView} />
      <OfferCardsList isGridView={isGridView} />
    </PageWrapper>
  )
}

export default FindOffers
