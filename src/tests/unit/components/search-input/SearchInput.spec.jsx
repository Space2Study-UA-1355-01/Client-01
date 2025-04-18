import { fireEvent, render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'

import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput', () => {
  const setSearch = vi.fn()

  it('should render text correctly', () => {
    render(<SearchInput search='hello' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('hello')
  })

  it('should call setSearch when search icon is clicked', () => {
    render(<SearchInput setSearch={setSearch} />)
    const searchIcon = screen.getByTestId('search-icon')
    fireEvent.click(searchIcon)
    expect(setSearch).toHaveBeenCalled()
  })

  it('should call setState with empty string when delete icon is clicked', () => {
    render(<SearchInput setSearch={setSearch} />)
    const deleteIcon = screen.getByTestId('delete-icon')
    fireEvent.click(deleteIcon)
    expect(setSearch).toHaveBeenCalledWith('')
  })

  it('should call setSearch when enter is pressed', () => {
    const searchValue = 'hello'
    render(<SearchInput search={searchValue} setSearch={setSearch} />)
    const input = screen.getByRole('textbox')
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })
    expect(setSearch).toHaveBeenCalledWith(searchValue)
  })

  it('should have hidden class if search is empty', () => {
    render(<SearchInput search='' />)
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('hidden')
  })

  it('should have visible class if search is not empty', () => {
    render(<SearchInput search='hello' />)
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('visible')
  })
})
