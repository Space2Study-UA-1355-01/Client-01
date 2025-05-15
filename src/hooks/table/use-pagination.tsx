import { ChangeEvent, useCallback, useMemo, useState, useEffect } from 'react'

const usePagination = ({
  defaultPage = 1,
  itemsPerPage = 5,
  itemsCount = 10
} = {}) => {
  const pageCount = useMemo(
    () => Math.ceil(itemsCount / itemsPerPage),
    [itemsCount, itemsPerPage]
  )

  const checkedPage = useMemo(() => {
    if (isNaN(defaultPage) || defaultPage < 1) {
      return 1
    }
    return defaultPage
  }, [defaultPage])

  const [page, setPage] = useState<number>(checkedPage)
  const [rowsPerPage, setRowsPerPage] = useState<number>(itemsPerPage)
  const [pageInput, setPageInput] = useState<number | string>(1)

  useEffect(() => {
    setRowsPerPage(itemsPerPage)
    const totalPages = Math.ceil(itemsCount / itemsPerPage)
    const validPage = Math.min(Math.max(defaultPage, 1), totalPages || 1)
    setPage(validPage)
  }, [defaultPage, itemsCount, itemsPerPage])

  const handleChangePage = (_e: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }

  const handlePageSubmit = (maxPages: number) => {
    if (Number(pageInput) > maxPages) {
      setPageInput(maxPages)
      return setPage(maxPages)
    }
    if (Number(pageInput) < 1) {
      setPageInput(1)
      return setPage(1)
    }
    setPage(Number(pageInput))
  }

  const handleChangePageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value)
  }

  const clearPage = useCallback(() => setPage(1), [])

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    pageInput,
    setPageInput,
    pageCount,
    itemsCount,
    clearPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handlePageSubmit,
    handleChangePageInput
  }
}

export default usePagination
