import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  step: {
    pb: '40px'
  },
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    gap: '40px',
    paddingBottom: { xs: '30px', sm: '0px', lg: '30px' },
    ...fadeAnimation
  },
  containerImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: { xs: '180px', sm: '250px', lg: '350px' },
    height: 'auto',
    objectFit: 'contain',
    display: { xs: 'block', sm: 'none', md: 'block' }
  },
  body2: {
    marginLeft: { md: '50%' },
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    fontSize: { xs: '14px', sm: '16px' },
    lineHeight: { xs: '20px', sm: '30px' },
    letterSpacing: '0.25%',
    pb: { xs: '16px' },
    display: 'block'
  },
  content: {
    width: { xs: '100%', md: '50%' },
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  autocompletes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingBottom: { sm: '20px' }
  },
  chipListWrapper: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  btnsBox: {
    marginLeft: { lg: '50%' },
    width: { xs: '100%', lg: '50%' }
  }
}
