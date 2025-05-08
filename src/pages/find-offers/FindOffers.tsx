import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import OfferCardsList from '~/containers/find-offer/offer-cards-list/OfferCardsList'

const FindOffers = () => {
  return (
    <PageWrapper>
      <OfferRequestBlock />
      <OfferCardsList />
    </PageWrapper>
  )
}

export default FindOffers
