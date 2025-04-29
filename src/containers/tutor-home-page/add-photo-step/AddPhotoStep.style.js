import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '440px',
    width: '100%',
    aspectRatio: '1',
    border: '2px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px',
    mt: { xs: '20px', md: '0px' },
    cursor: 'pointer'
  },
  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  activeDrag: {
    borderColor: 'primary.900'
  },
  img: {
    width: '100%',
    borderRadius: '20px',
    mt: { xs: '20px', md: '0px' }
  },
  clearButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,1)'
    }
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  description: {
    mb: 1
  },
  uploadControl: {
    display: 'flex',
    alignItems: 'center',
    mb: 1
  },
  uploadButton: {
    textTransform: 'none'
  },
  checkIcon: {
    ml: 1,
    fontSize: '1.5rem'
  },
  fileSize: {
    mb: 1
  },
  errorText: {
    mb: 1,
    fontSize: '14px'
  },
  navButtons: {
    mt: 'auto'
  }
}
