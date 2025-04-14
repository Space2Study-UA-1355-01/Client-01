import { render, screen, fireEvent } from '@testing-library/react'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import { vi } from 'vitest'

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

  it('should render typed text correctly', () => {
    fireEvent.change(input, { target: { value: 'some text' } })
    expect(input).toHaveValue('some text')
  })

  it('should delete typed text when delete button is clicked', () => {
    fireEvent.change(input, { target: { value: 'text' } })
    const clearButton = screen.getByTestId('clearIcon')
    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
  })

  it('should call updateFilter function on search button click', () => {
    const searchButton = screen.getByText('common.search')

    fireEvent.change(input, { target: { value: 'some query' } })
    fireEvent.click(searchButton)

    expect(updateFilter).toHaveBeenCalledWith('some query')
    expect(updateFilter).toHaveBeenCalledTimes(1)
  })

  it('should call updateFilter function when enter is pressed', () => {
    fireEvent.change(input, { target: { value: 'enter text' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(updateFilter).toHaveBeenCalledWith('enter text')
    expect(updateFilter).toHaveBeenCalledTimes(1)
  })
})
