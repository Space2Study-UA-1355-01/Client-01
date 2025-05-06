export const loginUserData = { email: 'user@gmail.com', password: '123' }

export const signupUserData = {
  email: 'user@gmail.com',
  password: 'testest_1',
  confirmPassword: 'testest_1',
  firstName: 'John',
  lastName: 'Doe'
}

export const initialState = {
  userId: '',
  userRole: '',
  authLoading: false,
  loading: true,
  pageLoad: false,
  error: '',
  isFirstLogin: true,
  firstName: '',
  lastName: '',
  photo: '',
  appLanguage: ''
}

export const stateAfterLogin = {
  userId: '681a273de14a41b58301f3d7',
  userRole: 'student',
  authLoading: false,
  loading: false,
  pageLoad: false,
  error: '',
  isFirstLogin: true,
  firstName: 'John',
  lastName: 'Doe',
  photo: '',
  appLanguage: ''
}

export const stateAfterSignup = {
  userId: '',
  userRole: '',
  loading: false,
  pageLoad: false,
  authLoading: false,
  error: '',
  isFirstLogin: true,
  firstName: '',
  lastName: '',
  photo: '',
  appLanguage: ''
}

export const errorMessage = 'Request failed with status code 404'
export const errorCode = 'USER_NOT_REGISTERED'

export const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWEyNzNkZTE0YTQxYjU4MzAxZjNkNyIsInJvbGUiOiJzdHVkZW50IiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaXNGaXJzdExvZ2luIjp0cnVlLCJpYXQiOjE3NDY1NDQ2NzYsImV4cCI6MTc0NjU0ODI3Nn0.AwekGVQlKtNTCPSA07betDLHe6A0xMmmfncEDduG2Tg'
