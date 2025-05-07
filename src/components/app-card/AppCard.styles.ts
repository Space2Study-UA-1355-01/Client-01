import {
  commonHoverShadow,
  commonShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: (isClickable: boolean) => ({
    display: 'flex',
    padding: '25px 33px 25px 32px',
    maxWidth: '360px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textDecoration: 'none',
    backgroundColor: 'basic.white',
    boxShadow: commonShadow,
    borderRadius: '6px',
    '&:hover': isClickable && {
      cursor: 'pointer',
      boxShadow: commonHoverShadow
    }
  })
}
