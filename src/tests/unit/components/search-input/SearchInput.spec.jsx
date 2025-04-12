import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'

import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput', () => {
  beforeEach(() => {
    render(<SearchInput />)
  })

  // it('test', () => {
  //   const SearchIcon = screen.getByTestId('search-icon')
  //   expect(SearchIcon).toBeInTheDocument()
  // })

  it('should render text correctly', () => {
    const textFieldElement = screen.getByRole('textbox')
    expect(textFieldElement).toBeInTheDocument()
  })

  it('should call setSearch when search icon is clicked', () => {
    /*  const searchIcon = screen.getByTestId('search-icon')
   expect setSearch to be called after this event */
  })

  it('should call setState with empty string when delete icon is clicked', () => {})
  it('should call setSearch when enter is pressed', () => {})
  it('should have hidden class if search is empty', () => {})
  it('should have visible class if search is not empty', () => {})
})
