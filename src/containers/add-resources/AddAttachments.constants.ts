import { Categories, Question, RemoveColumnRules, TableColumn } from '~/types'

export const columns = [] as TableColumn<Question>[]

export const removeColumnRules = ['_id'] as RemoveColumnRules<
  Question | Categories
>
