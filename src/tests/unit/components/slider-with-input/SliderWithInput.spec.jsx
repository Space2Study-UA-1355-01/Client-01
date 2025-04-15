import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

const handleChangeMock = vi.fn()

const defaultValue = 50
const min = 0
const max = 100
const title = 'Test'

const delay = 500

describe('SliderWithInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    handleChangeMock.mockReset()
    render(
      <SliderWithInput
        defaultValue={defaultValue}
        max={max}
        min={min}
        onChange={handleChangeMock}
        title={title}
      />
    )
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render correctly', () => {
    const titleElement = screen.getByText('Test')

    expect(titleElement).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', () => {
    const slider = screen.getByRole('slider')
    const inputValue = 100

    fireEvent.change(slider, { target: { value: inputValue } })
    vi.advanceTimersByTime(delay)

    expect(handleChangeMock).toHaveBeenCalledWith(inputValue)
  })

  it('should sync slider and input values', () => {
    const slider = screen.getByRole('slider')
    const input = screen.getByRole('textbox')
    const inputValue = 75

    fireEvent.change(slider, { target: { value: inputValue } })

    expect(input).toHaveValue(inputValue.toString())

    fireEvent.change(input, { target: { value: '30' } })

    expect(slider).toHaveValue('30')
  })

  it('should update inputValue correctly when input value is empty', () => {
    const input = screen.getByRole('textbox')
    const inputValue = ''

    fireEvent.change(input, { target: { value: inputValue } })

    expect(input).toHaveValue(inputValue)
  })

  it('should not update prices when input is blurred and value in input has not changed', () => {
    const input = screen.getByRole('textbox')
    const inputValue = min.toString()

    fireEvent.change(input, { target: { value: inputValue } })
    fireEvent.blur(input)

    expect(input).toHaveValue(inputValue)
    expect(handleChangeMock).not.toHaveBeenCalled()
  })

  it('should update prices when input is blurred and input is greater than max value', () => {
    const input = screen.getByRole('textbox')
    const inputValue = 101

    fireEvent.change(input, { target: { value: inputValue } })
    fireEvent.blur(input)

    expect(input).toHaveValue(max.toString())
  })

  it('should update prices when input is blurred and input is less than min value', () => {
    const input = screen.getByRole('textbox')
    const inputValue = -1

    fireEvent.change(input, { target: { value: inputValue } })
    fireEvent.blur(input)

    expect(input).toHaveValue(min.toString())
  })
})
