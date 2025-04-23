import { screen } from '@testing-library/react'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const label = 'common.labels.country'
const options = ['Finland', 'France', 'Georgia', 'Germany']
const styles = {}

describe('AppAutoComplete test', () => {
  const onChange = vi.fn()

  const setup = (customProps = {}) => {
    renderWithProviders(
      <AppAutoComplete
        onChange={onChange}
        options={options}
        sx={styles}
        textFieldProps={{ label }}
        type='text'
        value={null}
        {...customProps}
      />
    )
    return screen.getByRole('combobox')
  }

  beforeEach(() => {
    onChange.mockClear()
  })

  it('should render Autocomplete and choose option', async () => {
    const input = setup()
    await userEvent.click(input)

    const option = await screen.findByText('France')
    await userEvent.click(option)

    expect(onChange).toHaveBeenCalled()
  })

  it('should update search input on typing', async () => {
    const input = setup()
    await userEvent.type(input, 'Geor')
    expect(input).toHaveValue('Geor')
  })

  it('should filter options on typing', async () => {
    const input = setup()
    await userEvent.type(input, 'Fra')

    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.queryByText('Germany')).not.toBeInTheDocument()
  })

  it('should select an option on click', async () => {
    const input = setup()
    await userEvent.type(input, 'Fra')
    const option = await screen.findByText('France')
    await userEvent.click(option)

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][1]).toBe('France')
  })

  it('should clear search input on clear icon click', async () => {
    const input = setup({ value: 'Germany' })

    const clearButton = await screen.findByLabelText('Clear')
    expect(clearButton).toBeInTheDocument()

    await userEvent.click(clearButton)
    expect(input).toHaveValue('')
  })

  it('should trigger search on search button click', async () => {
    const mockSearch = vi.fn()

    renderWithProviders(
      <div>
        <AppAutoComplete
          onChange={vi.fn()}
          options={options}
          textFieldProps={{ label }}
          value='Geor'
        />
        <button data-testid='search-button' onClick={mockSearch}>
          Search
        </button>
      </div>
    )

    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'Geor')

    const searchButton = screen.getByTestId('search-button')
    await userEvent.click(searchButton)

    expect(mockSearch).toHaveBeenCalled()
  })
})
