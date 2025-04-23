import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import AppRange from '~/components/app-range/AppRange'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (fn) => fn
}))

describe('AppRange', () => {
  let onChange
  let min
  let max

  beforeEach(() => {
    onChange = vi.fn()
    min = 1
    max = 10
  })

  it('should renders correctly', () => {
    render(<AppRange max={max} min={min} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)

    expect(inputs[0]).toHaveValue('1')
    expect(inputs[1]).toHaveValue('10')
  })

  it('should call onChange when slider is moved', () => {
    render(<AppRange max={max} min={min} onChange={onChange} />)

    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(2)

    fireEvent.change(sliders[0], { target: { value: '3' } })

    expect(onChange).toHaveBeenCalled()
  })

  it('should call onChange when input is changed', async () => {
    render(<AppRange max={max} min={min} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')

    await userEvent.clear(inputs[0])
    await userEvent.type(inputs[0], '3')

    expect(onChange).toHaveBeenCalled()
  })
  it('should not call onChange when input is changed wit not a number', async () => {
    render(<AppRange max={max} min={min} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')

    await userEvent.type(inputs[0], 'notToTriggerOnChange')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should call onChange whith min number if input is empty', async () => {
    render(<AppRange max={max} min={min} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')

    await userEvent.clear(inputs[0])
    await userEvent.tab()
    expect(inputs[0]).toHaveValue('1')
  })
  it('should update prices when input is blurred and input is greater than max value', async () => {
    render(<AppRange max={max} min={min} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    const to = inputs[1]

    await userEvent.clear(to)

    await userEvent.type(to, '99')

    expect(to).toHaveValue('99')

    await userEvent.tab()

    expect(to).toHaveValue(String(max))
  })
  it('should not update prices when input is blurred and value in input has not changed', async () => {
    render(<AppRange max={max} min={min} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    const [from, to] = inputs

    await userEvent.tab()

    expect(onChange).not.toHaveBeenCalled()

    expect(to).toHaveValue(String(max))
    expect(from).toHaveValue(String(min))
  })
})
