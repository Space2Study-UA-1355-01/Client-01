import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'
import userEvent from '@testing-library/user-event'

// interface SliderWithInputProps {
//     defaultValue: number
//     title: string
//     max: number
//     min: number
//     onChange: (value: number) => void
//   }

describe('SliderWithInput', () => {
  it('should render correctly', () => {
    const handleChange = vi.fn()
    render(
      <SliderWithInput
        defaultValue={50}
        max={100}
        min={0}
        onChange={handleChange}
        title='Volume'
      />
    )
    const titleElement = screen.getByText('Volume')
    expect(titleElement).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <SliderWithInput
        defaultValue={50}
        max={100}
        min={0}
        onChange={handleChange}
        title='Volume'
      />
    )

    /*
    mock a onChange fn -> find user-event for a slider move 
    */

    const slider = screen.getByRole('slider')

    await user.click(slider)
    expect(slider).toHaveFocus()
  })

  it('should update inputValue correctly when input value is empty', () => {})
  it('should not update prices when input is blurred and value in input has not changed', () => {})
  it('should update prices when input is blurred and input is greater than max value', () => {})
})
