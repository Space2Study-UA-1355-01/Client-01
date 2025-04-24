import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { xs: 'center', md: 'space-between' },
    gap: { xs: '16px', md: '40px' },
    height: { sm: 'auto', md: '485px' },
    paddingBottom: { xs: '30px', md: '0px' },
    width: '100%',
    maxWidth: '1200px',
    ...fadeAnimation
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: { xs: 'center', md: 'flex-start' },
    order: { xs: 2, md: 1 },
    width: { md: '50%' }
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    order: { xs: 1, md: 2 },
    width: { md: '50%' },
    alignItems: { xs: 'center', md: 'flex-start' }
  },
  body2: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    fontSize: { xs: '14px', sm: '16px' },
    lineHeight: { xs: '20px', sm: '30px' },
    letterSpacing: '0.25%',
    textAlign: { xs: 'center', md: 'left' }
  },
  containerImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: { xs: '180px', sm: '250px' },
    display: { xs: 'block', sm: 'none', md: 'block' }
  },
  autocompletes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: { xs: '100%', sm: '400px' },
    order: { xs: 3 }
  },
  chipListWrapper: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  btnsBox: {
    order: { xs: 4 },
    display: 'flex',
    justifyContent: { xs: 'center', md: 'flex-start' }
  }
}
