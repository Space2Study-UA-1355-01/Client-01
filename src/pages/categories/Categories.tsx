import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'

import CardsList from '~/components/cards-list/CardsList'
import { CardWithLinkProps } from '~/components/card-with-link/CardWithLink'

const mockCards: CardWithLinkProps[] = [
  {
    _id: '64884fedfdc2d1a130c24ade',
    img: '/icons/design.svg',
    title: 'Design',
    description: '24 offers'
  },
  {
    _id: '64884fedfdc2d1a130c24adf',
    img: '/icons/development.svg',
    title: 'Development',
    description: '36 offers'
  }
]

const Categories = () => {
  const handleLoadMore = () => {}

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <CardsList
        btnText='Load more'
        cards={mockCards.map((card) => ({
          ...card,
          link: `/categories/subjects?categoryId=${card._id}`
        }))}
        isExpandable={false}
        loading={false}
        onClick={handleLoadMore}
      />
    </PageWrapper>
  )
}

export default Categories
