import { IconButton, Box } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import { styles } from '~/components/view-switcher/ViewSwitcher.styles'

interface ViewSwitcherProps {
  isGridView: boolean
  setIsGridView: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewSwitcher = ({ isGridView, setIsGridView }: ViewSwitcherProps) => {
  return (
    <Box sx={styles.switcher}>
      <IconButton
        aria-label='List view'
        onClick={() => setIsGridView(false)}
        sx={{
          ...styles.icon,
          ...(isGridView ? {} : styles.activeIcon)
        }}
      >
        <ListIcon />
      </IconButton>
      <IconButton
        aria-label='Grid view'
        onClick={() => setIsGridView(true)}
        sx={{
          ...styles.icon,
          ...(isGridView ? styles.activeIcon : {})
        }}
      >
        <GridViewIcon />
      </IconButton>
    </Box>
  )
}

export default ViewSwitcher
