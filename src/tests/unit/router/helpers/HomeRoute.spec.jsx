import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import HomeRoute from '~/router/helpers/HomeRoute'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: ({ to }) => <div>Redirected to {to}</div>
  }
})

const userId = '63f5d0ebb'
const studentState = {
  appMain: { userRole: 'student', userId }
}
const tutorState = {
  appMain: { userRole: 'tutor', userId }
}
const adminState = {
  appMain: { userRole: 'admin', userId }
}
describe('HomeRoute component', () => {
  it('should render GuestHomePage when there is no userRole', () => {
    renderWithProviders(<HomeRoute />)

    const welcomeDescription = screen.getByText(
      /guestHomePage.welcomeBlock.description/i
    )

    expect(welcomeDescription).toBeInTheDocument()
  })

  it('should redirect to "student" when userRole is student', () => {
    renderWithProviders(<HomeRoute />, {
      preloadedState: studentState
    })

    expect(screen.getByText('Redirected to student')).toBeInTheDocument()
  })

  it('should redirect to "tutor" when userRole is tutor', () => {
    renderWithProviders(<HomeRoute />, {
      preloadedState: tutorState
    })

    expect(screen.getByText('Redirected to tutor')).toBeInTheDocument()
  })

  it('should redirect to "admin" when userRole is admin', () => {
    renderWithProviders(<HomeRoute />, {
      preloadedState: adminState
    })

    expect(screen.getByText('Redirected to admin')).toBeInTheDocument()
  })
})
