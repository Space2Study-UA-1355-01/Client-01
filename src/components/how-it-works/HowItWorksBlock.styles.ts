import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: palette.basic.white,
    borderRadius: '16px',
    p: '50px'
  },
  stepContainer: {
    display: {
      xs: 'flex', // мобілка — колонка
      md: 'grid', // планшет — сітка 2x2
      lg: 'flex' // десктоп — горизонтальний ряд
    },
    flexDirection: {
      xs: 'column',
      lg: 'row' // тільки на десктопі
    },
    gridTemplateColumns: {
      md: '1fr 1fr' // планшет — 2 в ряд
    },
    gap: {
      xs: '54px',
      md: '40px'
    },
    mt: '48px',
    textAlign: 'center',
    justifyContent: {
      lg: 'space-around',
      xs: 'center'
    }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center',
      mb: '32px'
    },
    title: {
      typography: { xs: 'h4' }
    },
    description: {
      typography: { xs: 'subtitle1' }
    }
  },
  button: {
    alignSelf: 'center',
    mb: '48px',
    mt: '88px',
    p: '16px 32px'
  }
}
