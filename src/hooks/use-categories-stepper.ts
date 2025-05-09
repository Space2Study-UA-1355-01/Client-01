import { useCallback } from 'react'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import {
  CategoryInterface,
  CategorySubjectStepper,
  ErrorResponse
} from '~/types'

interface UseCategoriesNamesProps {
  fetchOnMount?: boolean
}

interface UseCategoriesNamesResult {
  loading: boolean
  response: CategorySubjectStepper<CategoryInterface>
  fetchData: (params?: { page?: number; limit?: number }) => Promise<void>
  error: ErrorResponse | null
}

const useCategoriesNames = ({
  fetchOnMount = true
}: UseCategoriesNamesProps = {}): UseCategoriesNamesResult => {
  const getCategories = useCallback(
    (params: { page?: number; limit?: number } = {}) =>
      categoryService.getCategories(params),
    []
  )

  const { loading, response, fetchData, error } = useAxios<
    CategorySubjectStepper<CategoryInterface>,
    { page?: number; limit?: number },
    CategorySubjectStepper<CategoryInterface>
  >({
    service: getCategories,
    fetchOnMount,
    defaultResponse: {
      data: [] as CategoryInterface[],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1
    }
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames
