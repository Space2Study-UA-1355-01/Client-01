import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    justifyContent: 'space-between',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation
  },
  imgContainer: {
    display: {
      xs: 'flex',
      sm: 'none',
      md: 'flex',
      lg: 'flex'
    },
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: { width: '100%' },
  textArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '8px'
  },
  rightBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  }
}
