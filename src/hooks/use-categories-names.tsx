import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryNameInterface } from '~/types'

interface UseCategoriesNamesProps<T extends CategoryNameInterface> {
  fetchOnMount?: boolean
  transform?: (
    data: CategoryNameInterface[] | { data: CategoryNameInterface[] }
  ) => T[]
}

const useCategoriesNames = <
  T extends CategoryNameInterface = CategoryNameInterface
>({ fetchOnMount = true, transform }: UseCategoriesNamesProps<T> = {}) => {
  const getCategoriesNames = useCallback(
    () => categoryService.getCategoriesNames(),
    []
  )

  const { loading, response, fetchData, error } = useAxios<
    CategoryNameInterface[]
  >({
    service: getCategoriesNames,
    fetchOnMount,
    defaultResponse: defaultResponses.array,
    transform
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames
