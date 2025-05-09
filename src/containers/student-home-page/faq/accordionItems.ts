import { student, tutor } from '~/constants'
import { AccordionItem } from '~/types'

export const accordionItems: Record<string, AccordionItem[]> = {
  [student]: [
    {
      title: 'studentHomePage.faq.findTutor',
      description: 'studentHomePage.faq.findTutorDescription'
    },
    {
      title: 'studentHomePage.faq.bookLesson',
      description: 'studentHomePage.faq.bookLessonDescription'
    },
    {
      title: 'studentHomePage.faq.rules',
      description: 'studentHomePage.faq.rulesDescription'
    },
    {
      title: 'studentHomePage.faq.howPayLessons',
      description: 'studentHomePage.faq.howPayLessonsDescription'
    }
  ],
  [tutor]: [
    {
      title: 'tutorHomePage.faq.findStudent',
      description: 'tutorHomePage.faq.findStudentDescription'
    },
    {
      title: 'tutorHomePage.faq.fillTutorProfile',
      description: 'tutorHomePage.faq.fillTutorProfileDescription'
    },
    {
      title: 'tutorHomePage.faq.rules',
      description: 'tutorHomePage.faq.rulesDescription'
    },
    {
      title: 'tutorHomePage.faq.getPaid',
      description: 'tutorHomePage.faq.getPaidDescription'
    }
  ]
}
