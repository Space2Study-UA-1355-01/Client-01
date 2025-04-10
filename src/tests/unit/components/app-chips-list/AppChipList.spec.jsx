import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AppChipList from '~/components/app-chips-list/AppChipList'

describe('AppChipList', () => {
  const items = [
    'chip1',
    'chip2',
    'chip3',
    'chip4',
    'chip5',
    'chip6',
    'chip7',
    'chip8',
    'chip9',
    'chip10'
  ]

  it('should show chips', () => {
    render(<AppChipList defaultQuantity={5} items={['chip1', 'chip2']} />)

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(2)
    expect(screen.queryByTestId('amount-of-chips')).not.toBeInTheDocument()
  })

  it('should show chip with +3', () => {
    render(<AppChipList defaultQuantity={5} items={items.slice(0, 8)} />)

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(5)

    const extraChips = screen.getByTestId('amount-of-chips')
    expect(extraChips).toHaveTextContent('+3')
  })

  it('should show only 7 chips', () => {
    render(<AppChipList defaultQuantity={7} items={items.slice(0, 7)} />)

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(7)

    expect(screen.queryByTestId('amount-of-chips')).not.toBeInTheDocument()
  })

  it('should show only 10 chips', () => {
    render(<AppChipList defaultQuantity={10} items={items} />)

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(10)

    expect(screen.queryByTestId('amount-of-chips')).not.toBeInTheDocument()
  })

  it('should delete 1 chip', () => {
    const handleChipDelete = vi.fn()
    render(
      <AppChipList
        defaultQuantity={5}
        handleChipDelete={handleChipDelete}
        items={['chip1', 'chip2', 'chip3']}
      />
    )

    const deleteButtons = screen.getAllByTestId('close-btn')
    expect(deleteButtons).toHaveLength(3)

    fireEvent.click(deleteButtons[0])

    expect(handleChipDelete).toHaveBeenCalledTimes(1)
    expect(handleChipDelete).toHaveBeenCalledWith('chip1')
  })
})
