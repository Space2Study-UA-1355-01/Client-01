import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

describe('EnhancedTablePagination', () => {
  let paginationMock

  beforeEach(() => {
    paginationMock = {
      page: 1,
      pageInput: '1',
      rowsPerPage: 10,
      pageCount: 5,
      itemsCount: 50,
      handleChangePage: vi.fn(),
      handleChangeRowsPerPage: vi.fn(),
      handleChangePageInput: vi.fn(),
      handlePageSubmit: vi.fn()
    }
  })

  it('should render first page', () => {
    render(<EnhancedTablePagination pagination={paginationMock} />)

    const paginationInput = screen.getByTestId('pagination-page-input')
    expect(paginationInput).toHaveValue(1)
    expect(screen.getByText('table.go')).toBeInTheDocument()
  })

  it('should change page from 1 to 2', async () => {
    render(<EnhancedTablePagination pagination={paginationMock} />)
    const userClick = userEvent.setup()
    const secondPageButton = screen.getByRole('button', {
      name: 'Go to page 2'
    })

    await userClick.click(secondPageButton)

    expect(paginationMock.handleChangePage).toHaveBeenCalled()
    expect(paginationMock.handleChangePage).toHaveBeenCalledWith(
      expect.any(Object),
      2
    )
  })
})
