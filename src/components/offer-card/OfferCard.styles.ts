export const styles = {
  card: {
    p: 3,
    borderRadius: 3,
    boxShadow: 1,
    maxWidth: 1100,
    m: 'auto',
    bgcolor: 'background.paper'
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 3
  },
  leftSection: {
    minWidth: 140,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    pt: 1
  },
  avatar: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    mb: 1
  },
  name: {
    color: 'text.secondary',
    fontWeight: 500,
    mb: 0.5,
    typography: 'h6'
  },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
    mb: 0.5,
    bgcolor: 'grey.100',
    p: '3px 6px',
    borderRadius: 1,
    alignSelf: 'center'
  },
  starIcon: {
    color: 'warning.500',
    fontSize: 20,
    mr: 0.2,
    '&:last-of-type': {
      color: 'grey.300',
      mr: 0.5
    }
  },
  ratingText: {
    fontWeight: 500,
    borderRadius: 1,
    px: 0.7,
    ml: 0.5,
    fontSize: 12,
    lineHeight: '16px'
  },
  reviews: {
    color: 'text.secondary',
    typography: 'caption'
  },
  middleSection: {
    flex: 1
  },
  title: {
    fontWeight: 600,
    mb: 1,
    fontSize: 22,
    lineHeight: 1.2,
    typography: 'h6'
  },
  chip: {
    bgcolor: 'success.200',
    fontWeight: 500,
    lineHeight: '16px',
    borderRadius: 2,
    fontSize: 10,
    letterSpacing: '1.5px',
    height: 28
  },
  description: {
    color: 'text.secondary',
    fontWeight: 400,
    fontSize: 14,
    mb: 2,
    typography: 'body1'
  },
  languageBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  languageIcon: {
    fontSize: 20,
    color: 'text.secondary'
  },
  rightSection: {
    minWidth: 180,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 2
  },
  priceBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 1,
    mb: 1
  },
  price: {
    fontWeight: 500,
    lineHeight: '28px',
    typography: 'h6'
  },
  perHour: {
    color: 'text.secondary',
    fontWeight: 400,
    textTransform: 'uppercase',
    lineHeight: '15px',
    fontSize: 13,
    typography: 'body2'
  },
  showDetailsButton: {
    width: '100%',
    fontWeight: 500,
    fontSize: 16,
    bgcolor: 'primary.dark',
    color: 'primary.contrastText',
    '&:hover': {
      bgcolor: 'primary.main'
    }
  },
  sendMessageButton: {
    width: '100%',
    fontWeight: 500,
    fontSize: 16,
    bgcolor: 'grey.100',
    color: 'primary.dark',
    borderColor: 'grey.100',
    '&:hover': {
      borderColor: 'primary.dark',
      bgcolor: 'background.paper'
    }
  }
}
