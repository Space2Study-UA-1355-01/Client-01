import { useCallback, useEffect } from 'react'
import { defaultResponses } from '~/constants'
import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import {
  ErrorResponse,
  SubjectNameStepperInterface,
  SubjectsNamesResponse
} from '~/types'

interface UseSubjectsNamesProps<T> {
  category: string | null
  fetchOnMount?: boolean
  transform?: (data: SubjectNameStepperInterface[]) => T[]
}

interface UseSubjectsNamesResult<T> {
  loading: boolean
  response: T[]
  fetchData: () => Promise<void>
  error: ErrorResponse | null
}

const useSubjectsStepper = <T = SubjectNameStepperInterface>({
  category,
  fetchOnMount = true,
  transform
}: UseSubjectsNamesProps<T>): UseSubjectsNamesResult<T> => {
  const getSubjectsNames = useCallback(() => {
    //console.log('Fetching subjects for category:', category)
    // if (!category) {
    //   console.warn('No category provided, returning empty response')
    //   return Promise.resolve({
    //     data: [],
    //     total: 0,
    //     page: 1,
    //     limit: 10,
    //     totalPages: 1
    //   })
    // }
    return subjectService.getSubjectsNames(category)
  }, [category])

  const { loading, response, fetchData, error } = useAxios<
    SubjectsNamesResponse,
    undefined,
    T[]
  >({
    service: getSubjectsNames,
    fetchOnMount,
    defaultResponse: defaultResponses.array,
    transform: (response) => {
      const subjects = response?.data || []
      if (!subjects.length) {
        console.warn('No subjects returned for category:', category)
      }
      return transform ? transform(subjects) : subjects
    }
  })

  useEffect(() => {
    if (error) {
      console.error('Error fetching subjects:', {
        message: error.message,
        status: error.status
        //data: error.data
      })
    }
  }, [error])

  useEffect(() => {
    if (fetchOnMount && category) {
      void fetchData()
    }
  }, [category, fetchData, fetchOnMount])

  return { loading, response, fetchData, error }
}

export default useSubjectsStepper
