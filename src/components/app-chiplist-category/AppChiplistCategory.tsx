import { SvgIconProps, SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import AppChip from '~/components/app-chip/AppChip'
import AppPopover from '~/components/app-popover/AppPopover'

import { styles } from '~/components/app-chips-list/AppChipsList-styles'

interface AppChiplistCategoryProps<T> {
  items: T[]
  defaultQuantity: number
  getLabel: (item: T) => string
  handleChipDelete?: (item: string) => void
  icon?: React.ReactElement<SvgIconProps>
  wrapperStyle?: SxProps
}

const AppChiplistCategory = <T,>({
  items,
  defaultQuantity,
  getLabel,
  handleChipDelete,
  icon,
  wrapperStyle
}: AppChiplistCategoryProps<T>) => {
  const hideChips =
    items.length - defaultQuantity > 0 && items.length - defaultQuantity

  const chips = items.map((item) => {
    const handleDelete = handleChipDelete && {
      handleDelete: () => handleChipDelete(getLabel(item))
    }
    return (
      <AppChip {...handleDelete} icon={icon} key={getLabel(item)}>
        {getLabel(item)}
      </AppChip>
    )
  })

  const initialItems = (
    <Box sx={styles.feature}>{chips.slice(0, defaultQuantity)}</Box>
  )

  const showMoreElem = hideChips && (
    <Chip
      data-testid='amount-of-chips'
      label={`+${hideChips}`}
      sx={styles.chip}
    />
  )

  return (
    <Box sx={wrapperStyle}>
      <AppPopover
        PaperProps={{ sx: styles.paperProps }}
        TransitionProps={{ timeout: 500 }}
        hideElem
        initialItems={initialItems}
        initialItemsWrapperStyle={styles.initialItemsWrapperStyle}
        showMoreElem={showMoreElem}
      >
        <Box sx={{ ...styles.feature, p: '15px 20px' }}>{chips}</Box>
      </AppPopover>
    </Box>
  )
}

export default AppChiplistCategory
