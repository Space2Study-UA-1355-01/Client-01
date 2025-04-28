import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    height: { sm: '485px' },
    ...fadeAnimation
  },
  mobileHeading: {
    display: { xs: 'block', sm: 'none' },
    textAlign: 'left',
    mb: 2,
    fontSize: '14px'
  },
  desktopHeading: {
    display: { xs: 'none', sm: 'block' },
    mb: 2
  },
  button: {
    width: 1,
    height: '48px',
    padding: '7px 24px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'stretch'
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    height: 'auto',
    m: { sm: 0, xs: '0 auto' }
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    m: { md: 0, xs: '0 auto' },
    pt: 0,
    width: '100%'
  },
  input: {
    width: 1,
    mt: '20px',
    my: '16px'
  },
  chipContainer: { m: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }
}
