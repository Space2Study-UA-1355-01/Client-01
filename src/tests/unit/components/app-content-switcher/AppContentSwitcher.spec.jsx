import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { describe, it, expect, vi } from 'vitest'

const mockSwitchOptions = {
  left: { text: 'any text', tooltip: 'tooltip left' },
  right: { text: 'some more text', tooltip: 'tooltip right' }
}

describe('AppContentSwitcher', () => {
  it('renders two Typography elements with correct aria-labels (tooltips)', () => {
    render(
      <AppContentSwitcher
        active
        onChange={vi.fn()}
        switchOptions={mockSwitchOptions}
        typographyVariant='body1'
      />
    )

    const tooltipLeft = screen.getByLabelText('tooltip left')
    const tooltipRight = screen.getByLabelText('tooltip right')

    expect(tooltipLeft).toBeInTheDocument()
    expect(tooltipRight).toBeInTheDocument()
  })

  it('calls onChange when switch is clicked', async () => {
    const user = userEvent.setup()
    const onChangeMock = vi.fn()

    render(
      <AppContentSwitcher
        active={false}
        onChange={onChangeMock}
        switchOptions={mockSwitchOptions}
        typographyVariant='body1'
      />
    )

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('reflects active state in the switch', () => {
    render(
      <AppContentSwitcher
        active
        onChange={() => {}}
        switchOptions={mockSwitchOptions}
        typographyVariant='body1'
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })
})
