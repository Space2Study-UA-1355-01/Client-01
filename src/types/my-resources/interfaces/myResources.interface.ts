import { CommonEntityFields, RequestParams } from '~/types'

export interface Categories extends CommonEntityFields {
  name: string
  author: string
}

export interface GetResourcesParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

export interface UpdateResourceCategory {
  name: Categories['name']
  id: Categories['_id']
}

export interface GetResourcesCategoriesParams extends Partial<RequestParams> {
  name?: string
}

// export interface Lesson extends Categories, CommonEntityFields {
//   title: string
//   category: Categories
// }
//
// export interface Quiz extends Categories, CommonEntityFields {
//   title: string
//   category: Categories
// }
//
// export interface LessonData {
//   _id?: string
//   title: string
//   description: string
//   content: string
//   attachments: Attachment[]
//   category: string | null
// }
//
// export interface CourseResources extends CommonEntityFields {
//   title: string
//   text: string
//   answers: Answer[]
//   author: string
//   type: QuestionTypesEnum
//   category: Category | null
// }
