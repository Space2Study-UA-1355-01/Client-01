import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('~/hooks/use-breakpoints', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue({ isMobile: false })
}))

vi.mock('@mui/icons-material/Search', () => ({
  __esModule: true,
  default: () => <span data-testid='mock-search-icon' />
}))
vi.mock('@mui/icons-material/Clear', () => ({
  __esModule: true,
  default: () => <span data-testid='mock-clear-icon' />
}))

describe('SearchAutocomplete', () => {
  let searchValue
  let setSearchValue
  let textFieldProps

  beforeEach(() => {
    searchValue = ''
    setSearchValue = vi.fn()
    textFieldProps = {}
  })
  it('should render the component correctly with given props', () => {
    render(
      <SearchAutocomplete
        search={searchValue}
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
  it('should update the internal searchInput state and reflect changes in the DOM when typing into input', async () => {
    render(
      <SearchAutocomplete
        search={searchValue}
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })
  it('should filter the dropdown options based on input value', async () => {
    render(
      <SearchAutocomplete
        options={['Languages', 'Information Technology']}
        search={searchValue}
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.type(input, 'Lang')
    expect(input).toHaveAttribute('aria-expanded', 'true')

    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent('Languages')
  })
  it('should trigger setSearch with the selected value when clicking an option from the dropdown', async () => {
    render(
      <SearchAutocomplete
        options={['Languages', 'Information Technology']}
        search={searchValue}
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    const input = screen.getByRole('combobox')
    await userEvent.click(input)

    expect(input).toHaveAttribute('aria-expanded', 'true')

    const options = await screen.findAllByRole('option')
    const firstOption = options[0]
    await userEvent.click(firstOption)

    expect(setSearchValue).toHaveBeenCalledWith('Languages')
  })
  it('should call setSearch(searchInput) when clicking the search button', async () => {
    render(
      <SearchAutocomplete
        options={['Languages', 'Information Technology']}
        search={searchValue}
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'some typed text')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await userEvent.click(searchButton)

    expect(setSearchValue).toHaveBeenCalledWith('some typed text')
  })
  it('should trigger the search logic when pressing the "Enter" button', async () => {
    render(
      <SearchAutocomplete
        options={['Languages', 'Information Technology']}
        search={searchValue}
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    const text = 'some text'
    const input = screen.getByRole('combobox')
    await userEvent.type(input, `${text}[enter]`)

    expect(setSearchValue).toHaveBeenCalledWith(text)
  })
  it('should reset the input and call setSearch("") when clicking the clear icon', async () => {
    render(
      <SearchAutocomplete
        options={['Languages', 'Information Technology']}
        search={searchValue}
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'abc')

    const clearIcon = screen.getByTestId('mock-clear-icon')
    const clearBtn = clearIcon.closest('button')

    await userEvent.click(clearBtn)
    expect(setSearchValue).toHaveBeenCalledWith('')
    expect(input).toHaveValue('')
  })
  it('it should update the input value if the search prop changes externally', async () => {
    const { rerender } = render(
      <SearchAutocomplete
        options={['Languages', 'Information Technology']}
        search='Languages'
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    const input = screen.getByRole('combobox')
    expect(input).toHaveValue('Languages')

    rerender(
      <SearchAutocomplete
        options={['Languages', 'Information Technology']}
        search='Information Technology'
        setSearch={setSearchValue}
        textFieldProps={textFieldProps}
      />
    )
    expect(input).toHaveValue('Information Technology')
  })
  describe('SearchAutocomplete on mobile', () => {
    beforeEach(() => {
      useBreakpoints.mockReturnValue({ isMobile: true })
    })
    it('should render mobile search button with icon and trigger onSearch when clicked', async () => {
      render(
        <SearchAutocomplete
          search={searchValue}
          setSearch={setSearchValue}
          textFieldProps={textFieldProps}
        />
      )
      const input = screen.getByRole('combobox')
      await userEvent.type(input, 'abc')
      expect(input).toHaveValue('abc')

      const icon = screen.getByTestId('mock-search-icon')
      const searchButton = icon.closest('button')

      await userEvent.click(searchButton)
      expect(setSearchValue).toHaveBeenCalledWith('abc')
    })
    it('should render mobile clear icon and reset the input when clicked', async () => {
      render(
        <SearchAutocomplete
          search={searchValue}
          setSearch={setSearchValue}
          textFieldProps={textFieldProps}
        />
      )
      const input = screen.getByRole('combobox')
      await userEvent.type(input, 'abc')
      expect(input).toHaveValue('abc')

      const clearIcon = screen.getByTestId('mock-clear-icon')
      const clearBtn = clearIcon.closest('button')

      await userEvent.click(clearBtn)

      expect(input).toHaveValue('')
      expect(setSearchValue).toHaveBeenCalledWith('')
    })
  })
})
