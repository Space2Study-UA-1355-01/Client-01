import React from 'react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as redux from '~/hooks/use-redux'
import { renderWithProviders } from '~/tests/test-utils'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import {
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { student, tutor } from '~/constants'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual('react-i18next')
  return {
    ...actual,
    useTranslation: () => ({
      t: (key) => key
    })
  }
})

const dispatchMock = vi.fn()

const roles = [
  { name: 'student', userRole: student, stepLabels: studentStepLabels },
  { name: 'tutor', userRole: tutor, stepLabels: tutorStepLabels }
]

describe('UserStepsWrapper', () => {
  beforeEach(() => {
    dispatchMock.mockClear()
    vi.clearAllMocks()
    vi.spyOn(redux, 'useAppDispatch').mockReturnValue(dispatchMock)
    global.URL.createObjectURL = vi.fn(() => 'blob:mock')
    global.URL.revokeObjectURL = vi.fn()
  })

  roles.forEach(({ name, userRole, stepLabels }) => {
    describe(`role: ${name}`, () => {
      it('should render first tab', () => {
        renderWithProviders(<UserStepsWrapper userRole={userRole} />)
        const firstLabel = `step.stepLabels.${stepLabels[0]}`
        const firstTab = screen.getByText(firstLabel)
        expect(firstTab).toBeInTheDocument()
      })

      it('should render second tab', () => {
        renderWithProviders(<UserStepsWrapper userRole={userRole} />)
        const secondLabel = `step.stepLabels.${stepLabels[1]}`
        const secondTab = screen.getByText(secondLabel)
        expect(secondTab).toBeInTheDocument()
      })

      it('should open photo render error after add wrong file size', async () => {
        const { container } = renderWithProviders(
          <UserStepsWrapper userRole={userRole} />
        )
        const photoTab = screen.getByText(`step.stepLabels.${stepLabels[3]}`)
        await userEvent.click(photoTab)

        const fileInput = container.querySelector('input[type="file"]')
        const tooBigFile = new File(
          ['a'.repeat(validationData.maxFileSize + 1)],
          'big.png',
          { type: 'image/png' }
        )

        await userEvent.upload(fileInput, tooBigFile)

        expect(
          await screen.findByText('becomeTutor.photo.fileSizeError')
        ).toBeInTheDocument()
      })

      it('should resize and show photo after adding photo', async () => {
        const { container } = renderWithProviders(
          <UserStepsWrapper userRole={userRole} />
        )
        const photoLabel = `step.stepLabels.${stepLabels[3]}`
        const photoTab = screen.getByText(photoLabel)
        await userEvent.click(photoTab)

        const fileInput = container.querySelector('input[type="file"]')
        const smallFile = new File(['x'], 'small.png', { type: 'image/png' })
        await userEvent.upload(fileInput, smallFile)

        const img = await screen.findByRole('img')
        expect(img).toHaveAttribute('src', 'blob:mock')
      })
    })
  })
})
