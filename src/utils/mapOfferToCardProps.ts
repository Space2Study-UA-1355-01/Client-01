import { Offer } from '~/types'
import { OfferCardProps, AuthorRole } from '~/components/offer-card/OfferCard'
import { UserRoleEnum } from '~/types'

export const mapOfferToCardProps = (offer: Offer): OfferCardProps => {
  const normalizedRole: AuthorRole =
    offer.authorRole === UserRoleEnum.Tutor ? 'tutor' : 'student'

  return {
    price: offer.price,
    proficiencyLevel: offer.proficiencyLevel,
    title: offer.title,
    description: offer.description,
    languages: offer.languages,
    authorRole: normalizedRole,
    author: {
      firstName: offer.author.firstName,
      lastName: offer.author.lastName,
      photo: offer.author.photo,
      totalReviews: offer.author.totalReviews,
      averageRating: offer.author.averageRating
    },
    subject: offer.subjectName,
    onShowDetails: () => console.log('View details clicked', offer._id),
    onSendMessage: () => console.log('Send message clicked', offer._id)
  }
}
