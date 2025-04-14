import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

const defaultValue = 0
const title = 'hello'
const max = 5
const min = 0
const onChange = vi.fn()

// interface SliderWithInputProps {
//     defaultValue: number
//     title: string
//     max: number
//     min: number
//     onChange: (value: number) => void
//   }

describe('SliderWithInput', () => {
  it('should render correctly', () => {
    render(
      <SliderWithInput
        defaultValue={defaultValue}
        max={max}
        min={min}
        onChange={onChange}
        title={title}
      />
    )
    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
    screen.logTestingPlaygroundURL()
  })

  it('should call onChange when slider is moved', () => {})

  it('should update inputValue correctly when input value is empty', () => {})
  it('should not update prices when input is blurred and value in input has not changed', () => {})
  it('should update prices when input is blurred and input is greater than max value', () => {})
})
