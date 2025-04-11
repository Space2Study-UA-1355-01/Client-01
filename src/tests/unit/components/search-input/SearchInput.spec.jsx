import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'

import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput', () => {
  it('test', () => {
    render(<SearchInput />)
    const SearchIcon = screen.getByTestId('search-icon')
    expect(SearchIcon).toBeInTheDocument()
  })
})
