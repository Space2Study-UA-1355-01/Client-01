export const styles = {
  helperText: (multiline?: boolean) => ({
    overflow: 'hidden',
    lineHeight: '0',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    mr: multiline ? '48px' : '14px'
  })
}
