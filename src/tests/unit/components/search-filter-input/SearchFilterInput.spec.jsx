import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('SearchFilterInput', () => {
  let updateFilter
  let input

  beforeEach(() => {
    updateFilter = vi.fn()
    render(<SearchFilterInput updateFilter={updateFilter} />)
    input = screen.getByRole('textbox')
  })

  it('should render component with input in it', () => {
    expect(input).toBeInTheDocument()
  })

  it('should render typed text correctly', async () => {
    await userEvent.type(input, 'some text')
    expect(input).toHaveValue('some text')
  })

  it('should delete typed text when delete button is clicked', async () => {
    await userEvent.type(input, 'text')
    const clearButton = screen.getByTestId('clearIcon')
    await userEvent.click(clearButton)
    expect(input).toHaveValue('')
  })

  it('should call updateFilter function on search button click', async () => {
    const searchButton = screen.getByText('common.search')
    await userEvent.type(input, 'some query')
    await userEvent.click(searchButton)
    expect(updateFilter).toHaveBeenCalledWith('some query')
    expect(updateFilter).toHaveBeenCalledTimes(1)
  })

  it('should call updateFilter function when enter is pressed', async () => {
    await userEvent.type(input, 'enter text{enter}')
    expect(updateFilter).toHaveBeenCalledWith('enter text')
    expect(updateFilter).toHaveBeenCalledTimes(1)
  })
})
