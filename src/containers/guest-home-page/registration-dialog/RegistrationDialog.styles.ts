const style = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px' },
    mb: { xs: '56px' },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { lg: '50px', md: '40px' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
  },
  imgContainer: {
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: { lg: '50px', md: '30px' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 'inherit',
    minWidth: { lg: '400px' },
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '64px' },
    pl: { sm: '46px', md: '16px' },
    pr: { sm: '46px', md: '16px' },
    pb: { xs: '24px' }
  },
  title: {
    fontSize: '32px',
    lineHeight: '20px',
    pb: '10px'
  },
  form: {
    maxWidth: { xs: '370px' }
  },
  roleInfo: {
    mb: '16px',
    fontSize: '16px',
    color: 'text.secondary'
  }
}

export default style
