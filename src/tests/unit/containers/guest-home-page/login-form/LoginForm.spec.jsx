import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'
import { vi } from 'vitest'

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

const errors = { email: false, password: false }
const data = { email: 'email@mail.com', password: 'passTest1' }
const handleChange = vi.fn()
const handleBlur = vi.fn()
const handleSubmit = vi.fn()

const renderForm = (
  customData,
  customErrors,
  preloadedState = { appMain: { authLoading: false } }
) => {
  return renderWithProviders(
    <LoginForm
      data={customData}
      errors={customErrors}
      handleBlur={handleBlur}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />,
    { preloadedState }
  )
}

describe('Login form test', () => {
  beforeEach(() => {
    renderForm(data, errors)
  })

  it('should render email input label', () => {
    const inputLabel = screen.getByLabelText(/email/i)

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render password input label', () => {
    const inputLabel = screen.getByText('common.labels.password')

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render forgot password text', () => {
    const text = screen.getByText('login.forgotPassword')

    expect(text).toBeInTheDocument()
  })

  it('should render login button', () => {
    const button = screen.getByText('common.labels.login')

    expect(button).toBeInTheDocument()
  })

  it('should show visibility icon', async () => {
    const visibilityOffIcon = screen.getByTestId('VisibilityOffIcon')
    fireEvent.click(visibilityOffIcon)
    const visibilityIcon = screen.getByTestId('VisibilityIcon')

    await waitFor(() => {
      expect(visibilityIcon).toBeInTheDocument()
      expect(visibilityOffIcon).not.toBeInTheDocument()
    })
  })

  it('should submit', async () => {
    handleSubmit.mockImplementation((event) => {
      event.preventDefault()
    })
    const button = screen.getByText('common.labels.login')
    fireEvent.click(button)

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('should click forgot password text and open forgot password container', async () => {
    const text = screen.getByText('login.forgotPassword')
    fireEvent.click(text)
    const backBtn = screen.queryByText('login.backToLogin')

    await waitFor(() => expect(backBtn).toBeInTheDocument())
  })
})

describe('Login form test with loading', () => {
  const preloadedState = { appMain: { authLoading: true } }
  it('should render loader', () => {
    renderForm(data, errors, preloadedState)
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })
})

describe('Login button disabled state', () => {
  test.each([
    ['empty email', { email: '', password: 'passTest1' }, { email: false }],
    [
      'empty password',
      { email: 'email@mail.com', password: '' },
      { email: false }
    ],
    [
      'invalid email',
      { email: 'test', password: 'passTest1' },
      { email: 'common.errorMessages.emailValid' }
    ]
  ])('should disable button if %s', (caseName, customData, customErrors) => {
    renderForm(customData, customErrors)
    const button = screen.getByText('common.labels.login')
    expect(button).toBeDisabled()
  })

  it('should enable button if data is valid', () => {
    renderForm(data, errors)
    const button = screen.getByText('common.labels.login')
    expect(button).not.toBeDisabled()
  })
})
