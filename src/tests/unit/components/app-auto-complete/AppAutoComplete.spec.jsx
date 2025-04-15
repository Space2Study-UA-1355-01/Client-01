import { fireEvent, screen } from '@testing-library/react'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const value = null
const label = 'common.labels.country'
const options = ['Finland', 'France', 'Georgia', 'Germany']
const onChange = vi.fn()
const styles = {}

describe('AppAutoComplete test', () => {
  beforeEach(() => {
    onChange.mockClear()
    renderWithProviders(
      <AppAutoComplete
        onChange={onChange}
        options={options}
        sx={styles}
        textFieldProps={{
          label: label
        }}
        type='text'
        value={value}
      />
    )
  })

  it('Should render Autocomplete and choose option', async () => {
    const autocomplete = screen.getByLabelText(/common.labels.country/i)
    await userEvent.click(autocomplete)
    const option = screen.getByText('France')
    await userEvent.click(option)
    expect(onChange).toHaveBeenCalled()
  })

  it('Should update search input on typing', async () => {
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'Geor')
    expect(input).toHaveValue('Geor')
  })

  it('Should filter options on typing', async () => {
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'Fra')
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.queryByText('Germany')).not.toBeInTheDocument()
  })

  it('Should select an option on click', async () => {
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'Fra')
    const option = await screen.findByText('France')
    fireEvent.click(option)
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith('France')
  })

  it('Should clear search input on clear icon click', async () => {
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'Germany')
    const clearButton = screen.getByRole('button', { name: /clear/i })
    await userEvent.click(clearButton)
    expect(input).toHaveValue('')
  })

  it('Should trigger search on search button click', async () => {
    const mockSearch = vi.fn()
    renderWithProviders(
      <AppAutoComplete
        onChange={onChange}
        options={options}
        sx={styles}
        textFieldProps={{
          label: label,
          InputProps: {
            endAdornment: (
              <button data-testid='search-button' onClick={mockSearch}>
                Search
              </button>
            )
          }
        }}
        type='text'
        value={value}
      />
    )
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'Geor')
    const searchButton = screen.getByTestId('search-button')
    await userEvent.click(searchButton)
    expect(mockSearch).toHaveBeenCalled()
  })
})
