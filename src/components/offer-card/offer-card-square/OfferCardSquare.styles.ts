export const styles = {
  card: {
    width: 360,
    minHeight: 485,
    p: 3,
    borderRadius: 3,
    boxShadow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    bgcolor: 'background.paper',
    gap: 2
  },
  topSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 2
  },
  avatar: {
    width: 88,
    height: 88,
    flexShrink: 0
  },
  userInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5
  },
  name: {
    color: 'text.secondary',
    fontWeight: 500,
    mb: 0.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  languageRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5
  },
  languageIcon: {
    fontSize: 18,
    color: 'text.secondary'
  },
  languageText: {
    color: 'text.secondary',
    fontSize: 15
  },
  bookmarkButton: {
    alignSelf: 'flex-start',
    ml: 'auto'
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    mb: 2,
    color: 'text.primary',
    lineHeight: 1.2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  chipsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1
  },
  label: {
    fontSize: 13,
    color: 'text.secondary',
    fontWeight: 500,
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  chip: {
    bgcolor: 'success.200',
    fontWeight: 600,
    fontSize: 13,
    borderRadius: 2,
    px: 2,
    height: 28,
    color: 'text.primary',
    letterSpacing: 1
  },
  divider: {
    borderBottom: '1px solid',
    borderColor: 'grey.100',
    my: 2
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    mb: 2
  },
  price: {
    fontWeight: 400,
    fontSize: 20,
    color: 'text.primary'
  },
  perHour: {
    color: 'text.secondary',
    fontWeight: 400,
    fontSize: 13,
    textTransform: 'uppercase',
    typography: 'body2'
  },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5
  },
  starIcon: {
    color: 'warning.main',
    fontSize: 22,
    mr: 0.5
  },
  ratingText: {
    fontWeight: 400,
    fontSize: 20,
    color: 'text.primary',
    ml: 0.5,
    mr: 1
  },
  reviewsText: {
    color: 'text.secondary',
    fontSize: 13,
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  showDetailsButton: {
    width: '100%',
    fontWeight: 600,
    fontSize: 16,
    bgcolor: 'text.primary',
    color: 'background.paper',
    mt: 1,
    mb: 1,
    '&:hover': {
      bgcolor: 'grey.900'
    }
  },
  sendMessageButton: {
    width: '100%',
    fontWeight: 600,
    fontSize: 16,
    bgcolor: 'grey.100',
    color: 'text.primary',
    borderColor: 'grey.100',
    '&:hover': {
      borderColor: 'text.primary',
      bgcolor: 'background.paper'
    }
  }
}
