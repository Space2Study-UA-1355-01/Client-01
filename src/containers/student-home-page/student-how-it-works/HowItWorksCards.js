import howItWorksStudentFirst from '~/assets/img/guest-home-page/howItWorksStudentFirst.svg'
import howItWorksStudentSecond from '~/assets/img/guest-home-page/howItWorksStudentSecond.svg'
import howItWorksStudentThird from '~/assets/img/guest-home-page/howItWorksStudentThird.svg'
import howItWorksStudentFourth from '~/assets/img/guest-home-page/howItWorksStudentFourth.svg'

import howItWorksTutorFirst from '~/assets/img/guest-home-page/howItWorksTutorFirst.svg'
import howItWorksTutorSecond from '~/assets/img/guest-home-page/howItWorksTutorSecond.svg'
import howItWorksTutorThird from '~/assets/img/guest-home-page/howItWorksTutorThird.svg'
import howItWorksTutorFourth from '~/assets/img/guest-home-page/howItWorksTutorFourth.svg'

import { student, tutor } from '~/constants'

export const howItWorksCards = {
  [student]: [
    {
      image: howItWorksStudentSecond,
      title: 'studentHomePage.howItWorks.selectATutor.title',
      description: 'studentHomePage.howItWorks.selectATutor.description'
    },
    {
      image: howItWorksStudentThird,
      title: 'studentHomePage.howItWorks.sendRequest.title',
      description: 'studentHomePage.howItWorks.sendRequest.description'
    },
    {
      image: howItWorksStudentFourth,
      title: 'studentHomePage.howItWorks.startLearning.title',
      description: 'studentHomePage.howItWorks.startLearning.description'
    },
    {
      image: howItWorksStudentFirst,
      title: 'studentHomePage.howItWorks.writeFeedback.title',
      description: 'studentHomePage.howItWorks.writeFeedback.description'
    }
  ],
  [tutor]: [
    {
      image: howItWorksTutorFirst,
      title: 'tutorHomePage.howItWorks.signUp.title',
      description: 'tutorHomePage.howItWorks.signUp.description'
    },
    {
      image: howItWorksTutorSecond,
      title: 'tutorHomePage.howItWorks.createAccount.title',
      description: 'tutorHomePage.howItWorks.createAccount.description'
    },
    {
      image: howItWorksTutorThird,
      title: 'tutorHomePage.howItWorks.getNewStudents.title',
      description: 'tutorHomePage.howItWorks.getNewStudents.description'
    },
    {
      image: howItWorksTutorFourth,
      title: 'tutorHomePage.howItWorks.receiveFeedbacks.title',
      description: 'tutorHomePage.howItWorks.receiveFeedbacks.description'
    }
  ]
}
