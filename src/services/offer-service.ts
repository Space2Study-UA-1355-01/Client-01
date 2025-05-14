import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { GetOffersResponse } from '~/types'

export interface GetOffersParams {
  subjectId?: string
  categoryId?: string
  search?: string
}

export const offerService = {
  getOffers: (
    params?: GetOffersParams
  ): Promise<AxiosResponse<GetOffersResponse>> => {
    return axiosClient.get(URLs.offers.get, { params })
  }
}
