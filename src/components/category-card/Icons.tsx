import TagIcon from '@mui/icons-material/Tag'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import TranslateIcon from '@mui/icons-material/Translate'
import LanguageIcon from '@mui/icons-material/Language'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import ScienceIcon from '@mui/icons-material/Science'
import NightlightIcon from '@mui/icons-material/Nightlight'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import BiotechIcon from '@mui/icons-material/Biotech'
import ComputerIcon from '@mui/icons-material/Computer'
import CampaignIcon from '@mui/icons-material/Campaign'
import CodeIcon from '@mui/icons-material/Code'

export const CategoryIconsMap: Record<string, React.ElementType> = {
  Mathematics: TagIcon,
  History: LanguageIcon,
  Music: MusicNoteIcon,
  Languages: TranslateIcon,
  Design: DesignServicesIcon,
  Finance: AttachMoneyIcon,
  Painting: ColorLensIcon,
  Chemistry: ScienceIcon,
  Astronomy: NightlightIcon,
  Audit: FactCheckIcon,
  Biology: BiotechIcon,
  'Computer science': ComputerIcon,
  Programming: CodeIcon,
  Marketing: CampaignIcon
}
