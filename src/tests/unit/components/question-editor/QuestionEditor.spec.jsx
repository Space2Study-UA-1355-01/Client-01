import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import QuestionEditor from '~/components/question-editor/QuestionEditor'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('QuestionEditor', () => {
  const mockHandleInputChange = vi.fn(() => () => {})
  const mockHandleNonInputValueChange = vi.fn()
  const mockOnCancel = vi.fn()
  const mockOnSave = vi.fn()

  const baseData = {
    type: 'openAnswer',
    text: 'Initial question',
    answers: [],
    openAnswer: 'Initial answer'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render question input field', () => {
    render(
      <QuestionEditor
        data={baseData}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const questionInput = screen.getByLabelText('questionPage.question')
    expect(questionInput).toBeInTheDocument()
  })

  it('should render an open answer', () => {
    render(
      <QuestionEditor
        data={baseData}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const answerInput = screen.getByLabelText('questionPage.answer')
    expect(answerInput).toBeInTheDocument()
  })

  it('should change question type', async () => {
    const data = {
      ...baseData,
      type: 'multipleChoice',
      answers: [{ text: 'Test', isCorrect: false }]
    }

    render(
      <QuestionEditor
        data={data}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    await userEvent.click(
      screen.getByText('questionPage.questionType.multipleChoice')
    )
    await userEvent.click(
      screen.getByText('questionPage.questionType.oneAnswer')
    )

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'type',
      'oneAnswer'
    )
  })

  it('should change question and answer input fields', async () => {
    render(
      <QuestionEditor
        data={baseData}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const questionInput = screen.getByLabelText('questionPage.question')
    const answerInput = screen.getByLabelText('questionPage.answer')

    expect(questionInput).toHaveValue('Initial question')
    expect(answerInput).toHaveValue('Initial answer')

    await userEvent.clear(questionInput)
    await userEvent.type(questionInput, 'Updated question')

    await userEvent.clear(answerInput)
    await userEvent.type(answerInput, 'Updated answer')

    expect(mockHandleInputChange).toHaveBeenCalledWith('text')
    expect(mockHandleInputChange).toHaveBeenCalledWith('openAnswer')
  })

  it('should click on edit title and category', async () => {
    const onEditMock = vi.fn()

    render(
      <QuestionEditor
        data={baseData}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
        isQuizQuestion
        onEdit={onEditMock}
      />
    )

    const moreButton = screen.getByRole('button')
    await userEvent.click(moreButton)
    const menuItem = screen.getByText(
      'myResourcesPage.questions.titleWithCategory'
    )
    await userEvent.click(menuItem)

    expect(onEditMock).toHaveBeenCalled()
  })

  it('should delete an answer for multiple choice', async () => {
    const data = {
      ...baseData,
      type: 'multipleChoice',
      answers: [{ text: 'Test answer', isCorrect: false }]
    }

    render(
      <QuestionEditor
        data={data}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const deleteButton = screen.getByRole('button')
    await userEvent.click(deleteButton)

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'answers',
      expect.arrayContaining([])
    )
  })

  it('should add new answer when addNewOneAnswer is called', async () => {
    const data = {
      ...baseData,
      type: 'multipleChoice',
      answers: [{ text: 'Answer 1', isCorrect: false }]
    }

    render(
      <QuestionEditor
        data={data}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const addButton = screen.getByLabelText('questionPage.addNewOne')
    await userEvent.click(addButton)

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'answers',
      expect.arrayContaining([
        expect.objectContaining({ text: '', isCorrect: false })
      ])
    )
  })

  it('should update correct option when handleOptionChange is called', async () => {
    const data = {
      ...baseData,
      type: 'multipleChoice',
      answers: [
        { text: 'Answer 1', isCorrect: false },
        { text: 'Answer 2', isCorrect: false }
      ]
    }

    render(
      <QuestionEditor
        data={data}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const checkbox = screen.getAllByRole('checkbox')[0]
    await userEvent.click(checkbox)

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'answers',
      expect.arrayContaining([expect.objectContaining({ isCorrect: true })])
    )
  })

  it('should call onCancel when cancel button is clicked', async () => {
    render(
      <QuestionEditor
        data={baseData}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
      />
    )

    const cancelButton = screen.getByText('common.cancel')
    await userEvent.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })
})
