import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

export const styles = {
  form: {
    overflow: 'auto',
    maxWidth: { xs: '370px' },
    minWidth: { md: '340px' },
    pt: '16px',
    pr: { md: '0p' },
    pb: { sm: '10px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    ...scrollbar
  },
  fullname: {
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    gap: { lg: '16px' }
  },
  input: {
    maxWidth: '343px'
  },
  loginButton: {
    width: '100%',
    py: '14px'
  }
}
