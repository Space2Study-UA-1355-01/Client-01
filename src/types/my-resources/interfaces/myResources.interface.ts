import {
  Answer,
  Category,
  CommonEntityFields,
  Question,
  QuestionTypesEnum,
  RequestParams
} from '~/types'

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

export interface Lesson extends CommonEntityFields {
  title: string
  category: string | null | Category
  text?: string
  answers?: Answer[]
  author?: string
}

export interface Quiz extends Question, CommonEntityFields {
  title: string
  // category: string | null
  description: string
  items: Question[]
}

export interface LessonData {
  _id?: string
  title: string
  description: string
  content: string
  attachments: Attachment[]
  category: string | null
}

export interface CourseResources extends CommonEntityFields {
  title: string
  text: string
  answers: Answer[]
  author: string
  type: QuestionTypesEnum
  category: Category | null
}

export interface Attachment extends CourseResources, Question {
  _id: string
  fileName: string
  size: number
  url: string
  extension: string
}
