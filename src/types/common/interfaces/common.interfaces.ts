import { Offer, UserResponse, UserRoleEnum } from '~/types'

export interface ItemsWithCount<T> {
  count: number
  items: T[]
}

export interface CategorySubjectStepper<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CommonEntityFields {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface CategoryAppearance {
  icon: string
  color: string
}

export interface DataByRole<T> {
  [UserRoleEnum.Student]: T
  [UserRoleEnum.Tutor]: T
}

export interface CategoryInterface {
  _id: string
  name: string
  appearance: CategoryAppearance
  totalOffers: DataByRole<number>
  createdAt: string
  updatedAt: string
}

export interface CategoryNameInterface {
  _id: string
  name: string
}

export interface SubjectInterface {
  _id: string
  name: string
  category: string
  totalOffers: DataByRole<number>
  createdAt: string
  updatedAt: string
}

export interface SubjectNameInterface {
  _id: string
  name: string
}

export interface SubjectNameStepperInterface {
  _id: string
  name: string
  category: string
  totalOffers?: {
    student: number
    tutor: number
  }
  createdAt?: string
  updatedAt?: string
}

export interface SubjectsNamesResponse {
  data: SubjectNameInterface[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ReviewInterface {
  offer: Offer
  author: UserResponse
  comment: string
  rating: number
  createdAt: string
}

export interface Faq {
  _id?: string
  question: string
  answer: string
}

export interface OutletContext {
  pageRef: React.RefObject<HTMLDivElement> | null
}

export interface Breakpoints {
  isDesktop: boolean
  isLaptopAndAbove: boolean
  isLaptop: boolean
  isTablet: boolean
  isMobile: boolean
}

export interface RouteItem {
  route: string
  path: string
}

export interface AddDocuments {
  maxFileSize: number
  maxAllFilesSize: number
  filesTypes: string[]
  fileSizeError: string
  allFilesSizeError: string
  typeError: string
  maxQuantityFiles: number
}

export interface Media {
  name: string
  path: string
}

export interface File extends CommonEntityFields {
  name: string
  size: number
  url: string
}

export interface Link {
  _id: string
  name: string
  url: string
}

// export type Attachment = CourseResources | Question

// import { axiosClient } from '~/plugins/axiosClient';
// import { AxiosResponse, AxiosRequestConfig } from 'axios';
// import { URLs } from '~/constants/request';
// import { ItemsWithCount, SubjectInterface, SubjectsNamesResponse } from '~/types';
// import { createUrlPath } from '~/utils/helper-functions';

// export const subjectService = {
//   getSubjects: (
//     params?: Pick<SubjectInterface, 'name'>,
//     categoryId?: string
//   ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
//     const category = createUrlPath(URLs.categories.get, categoryId);
//     console.log('URL для getSubjects:', `${category}${URLs.subjects.get}`);
//     return axiosClient.get(`${category}${URLs.subjects.get}`, { params });
//   },
//   getSubjectsNames: (
//     categoryId: string | null
//   ): Promise<AxiosResponse<SubjectsNamesResponse>> => {
//     if (!categoryId) {
//       console.log('No categoryId');
//       const mockResponse: AxiosResponse<SubjectsNamesResponse> = {
//         data: {
//           data: [],
//           total: 0,
//           page: 1,
//           limit: 20,
//           totalPages: 1
//         },
//         status: 200,
//         statusText: 'OK',
//         headers: {},
//         config: {} as AxiosRequestConfig
//       };
//       return Promise.resolve(mockResponse);
//     }
//     console.log('categoryId URL:', categoryId);
//     const category = createUrlPath(URLs.categories.get, categoryId);
//     const pathUrl = `${category}${URLs.subjects.getNames}`;
//     console.log('URL API (путь):', pathUrl);
//     return axiosClient.get(pathUrl, { params: { _t: Date.now() } })
//       .then((response) => {
//         console.log('Ответ API (путь):', response.data);
//         return response;
//       })
//       .catch((error) => {
//         console.error('Error:', {
//           сообщение: error.message,
//           статус: error.response?.status,
//           данные: error.response?.data
//         });
//         throw error;
//       });
//   }
// };

// import { axiosClient } from '~/plugins/axiosClient'
// import { AxiosResponse } from 'axios'

// import { URLs } from '~/constants/request'
// import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'
// import { createUrlPath } from '~/utils/helper-functions'

// export const subjectService = {
//   getSubjects: (
//     params?: Pick<SubjectInterface, 'name'>,
//     categoryId?: string
//   ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
//     const category = createUrlPath(URLs.categories.get, categoryId)
//     return axiosClient.get(`${category}${URLs.subjects.get}`, { params })
//   },
//   getSubjectsNames: (
//     categoryId: string | null
//   ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
//     const category = createUrlPath(URLs.categories.get, categoryId)
//     return axiosClient.get(`${category}${URLs.subjects.getNames}`)
//   }
// }
