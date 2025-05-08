import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  containerImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: { xs: '150px', sm: '250px', lg: '300px' },
    height: 'auto',
    objectFit: 'contain',
    display: { xs: 'block', sm: 'none', md: 'block' }
  },
  body2: {
    marginLeft: { md: '40%', lg: '55%' },
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    fontSize: { xs: '14px', sm: '16px' },
    lineHeight: { xs: '20px', sm: '30px' },
    letterSpacing: '0.25%',
    pb: { xs: '16px' }
  },
  content: {
    width: { xs: '100%', md: '60%', lg: '45%' },
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'space-between'
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
    marginLeft: { md: '40%', lg: '55%' },
    width: { xs: '100%', md: '60%', lg: '45%' }
  }
}
