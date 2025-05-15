import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  ItemsWithCount,
  SubjectInterface,
  SubjectNameInterface,
  SubjectParams
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const subjectService = {
  getSubjects: (
    params?: Pick<SubjectInterface, 'name'>,
    categoryId?: string
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.get}`, { params })
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  },
  postSubject: (data: {
    name: string
    category: string
    description: string
  }) => axiosClient.post(URLs.subjects.post, data),
  getAllSubjects: (params?: SubjectParams) => {
    return axiosClient.get(`${URLs.subjects.get}`, { params })
  }
}
