import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'
import Accordions from '~/components/accordion/Accordions'
import { ExpandMoreRounded } from '@mui/icons-material'
import { accordionItems } from './accordionItems'
import { AccordionItem, TypographyVariantEnum } from '~/types'
import { useState } from 'react'
import { useAppSelector } from '~/hooks/use-redux'

const Faq = () => {
  const [activeAccordionItems, setActiveAccordionItems] = useState<number[]>([])
  const { userRole } = useAppSelector((state) => state.appMain)

  const accordionItemsByRole: AccordionItem[] = accordionItems[userRole]

  const { t } = useTranslation()

  const onChange = (activeItem: number) => {
    setActiveAccordionItems((prevActiveItems) => {
      if (prevActiveItems.includes(activeItem)) {
        return prevActiveItems.filter(
          (prevActiveItem) => prevActiveItem !== activeItem
        )
      } else {
        return [...prevActiveItems, activeItem]
      }
    })
  }

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t(`${userRole}HomePage.faq.subtitle`)}
        style={styles.titleWithDescription}
        title={t(`${userRole}HomePage.faq.title`)}
      />
      <Accordions
        activeIndex={activeAccordionItems}
        descriptionVariant={TypographyVariantEnum.Body1}
        icon={<ExpandMoreRounded />}
        items={accordionItemsByRole}
        onChange={onChange}
        titleVariant={TypographyVariantEnum.H6}
      />
    </Box>
  )
}

export default Faq
