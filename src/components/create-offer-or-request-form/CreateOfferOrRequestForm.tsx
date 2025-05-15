import { ChangeEvent, FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Select,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import CloseIcon from '@mui/icons-material/Close'
import { useAppSelector } from '~/hooks/use-redux'
import { axiosClient } from '~/plugins/axiosClient'
import { Role } from '~/types/common/types/common.types'
import {
  QA,
  Category,
  Subject,
  FormProps,
} from '~/types/common/interfaces/common.interfaces'
import {
  levelOptions,
  optionLanguages,
  validProficiencyLevels
} from './constants'
import * as s from '~/components/create-offer-or-request-form/CreateOfferOrRequestForm.styles'

const CreateOfferOrRequestForm: FC<FormProps> = ({ onSuccess }) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain) as {
    userRole: Role
  }

  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [proficiencyLevel, setProficiencyLevel] = useState('Beginner')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [faqs, setFaqs] = useState<QA[]>([{ question: '', answer: '' }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false)
  const [languageSelectOpen, setLanguageSelectOpen] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const response = await axiosClient.get('/categories')
        console.log('Categories response:', response.data)
        const data = response.data.data
        const categoriesArray = Array.isArray(data) ? data : []
        setCategories(categoriesArray)
      } catch (err) {
        console.error('Fetch categories error:', err)
        setCategories([])
      } finally {
        setIsLoadingCategories(false)
      }
    }
    void fetchCategories()
  }, [t])

  useEffect(() => {
    if (!category) {
      setSubjects([])
      setSubject('')
      return
    }
    const fetchSubjects = async () => {
      setIsLoadingSubjects(true)
      try {
        const response = await axiosClient.get(
          `/categories/${category}/subjects/names`
        )
        console.log('Subjects response:', response.data)
        const data = response.data.data
        const subjectsArray = Array.isArray(data) ? data : []
        setSubjects(subjectsArray)
      } catch (err) {
        console.error('Fetch subjects error:', err)
        setSubjects([])
      } finally {
        setIsLoadingSubjects(false)
      }
    }
    void fetchSubjects()
  }, [category, t])

  const addFaq = () => {
    if (faqs.length >= 5) {
      return
    }
    setFaqs((f) => [...f, { question: '', answer: '' }])
  }

  const removeFaq = (i: number) =>
    setFaqs((f) => f.filter((_, idx) => idx !== i))
  const updateFaq = (i: number, field: keyof QA, val: string) =>
    setFaqs((f) => f.map((q, idx) => (idx === i ? { ...q, [field]: val } : q)))

  const validateForm = (): boolean => {
    const errors: Record<string, string | null> = {
      category: !category ? t('errorMessages.category') : null,
      subject: !subject ? t('errorMessages.subject') : null,
      languages: languages.length === 0 ? t('errorMessages.languages') : null,
      price:
        !price || isNaN(parseFloat(price)) || parseFloat(price) <= 0
          ? t('errorMessages.price')
          : null,
      description: !description ? t('errorMessages.description') : null,
      proficiencyLevel:
        !proficiencyLevel || !validProficiencyLevels.includes(proficiencyLevel)
          ? t('errorMessages.proficiencyLevel')
          : null
    }
    return Object.values(errors).every((err) => err === null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('handleSubmit triggered')

    if (!validateForm()) {
      console.log('Validation failed')
      return
    }
    try {
      setIsSubmitting(true)

      const formData = {
        role: userRole,
        category,
        subject,
        proficiencyLevel,
        title,
        description,
        price: parseFloat(price),
        languages,
        faqs: faqs.filter((qa) => qa.question && qa.answer)
      }
      console.log('Submitting form data:', formData)

      await axiosClient.post('/offers', formData)
      setCategory('')
      setSubject('')
      setProficiencyLevel('Beginner')
      setTitle('')
      setDescription('')
      setPrice('')
      setLanguages([])
      setFaqs([{ question: '', answer: '' }])
      console.log('Calling onSuccess')
      onSuccess?.()
    } catch (err) {
      console.error('Submission error:', err)
    } finally {
      setIsSubmitting(false)
      console.log('Submission complete')
    }
  }

  const formHeader = {
    title: t(`createOffer.title.${userRole}`),
    description: t(`createOffer.description.${userRole}`)
  }
  const specializationStep = {
    title: t(`title.firstStep.${userRole}`),
    description: t(`description.category.${userRole}`),
    fieldCategory: t(`labels.category`),
    fieldSubject: t(`labels.subject`),
    levelDescription: t(`description.level.${userRole}`),
    fieldLevel: t(`labels.level`)
  }
  const parametersStep = {
    title: t(`title.secondStep.${userRole}`),
    descriptions: {
      title: t(`description.title.${userRole}`),
      offer: t(`description.describe.${userRole}`),
      language: t(`description.languages.${userRole}`),
      price: t(`description.price.${userRole}`)
    },
    fields: {
      title: t(`labels.title`),
      offer: t(`labels.describe.${userRole}`),
      language: t(`labels.language`),
      price: t(`labels.price`)
    }
  }
  const faqStep = {
    title: t(`title.thirdStep`),
    descriptionTitle: t(`description.thirdStep.${userRole}`),
    fieldQuestion: t(`labels.question`),
    fieldAnswer: t(`labels.answer`),
    addButton: t(`button.addQuestion`)
  }
  const button = {
    submit: t(`createOffer.buttonTitles.${userRole}`)
  }

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e) 
      }}
    >
      <s.StepContainer>
        <s.TitleHeader>
          <LeakAddIcon fontSize='small' />
          <s.Title>{formHeader.title}</s.Title>
        </s.TitleHeader>
        <s.Description>{formHeader.description}</s.Description>
      </s.StepContainer>

      <s.StepContainer>
        <s.TitleHeader>
          <s.TitleIcon>1</s.TitleIcon>
          <s.Title>{specializationStep.title}</s.Title>
        </s.TitleHeader>
        <s.Content>
          <s.Description>{specializationStep.description}</s.Description>
          <s.InputContainer>
            <FormControl fullWidth margin='normal' variant='outlined'>
              <InputLabel id='category-label'>
                {specializationStep.fieldCategory}
              </InputLabel>
              <Select
                disabled={isLoadingCategories}
                displayEmpty
                label={specializationStep.fieldCategory}
                labelId='category-label'
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
                value={category}
              >
                {categories.length === 0 && (
                  <MenuItem disabled value=''>
                    {isLoadingCategories
                      ? t('common.loading')
                      : t('common.noCategories')}
                  </MenuItem>
                )}
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </s.InputContainer>
          <s.InputContainer>
            <FormControl fullWidth margin='normal' variant='outlined'>
              <InputLabel id='subject-label'>
                {specializationStep.fieldSubject}
              </InputLabel>
              <Select
                disabled={!category || isLoadingSubjects}
                displayEmpty
                label={specializationStep.fieldSubject}
                labelId='subject-label'
                onChange={(e) => {
                  setSubject(e.target.value)
                }}
                value={subject}
              >
                {subjects.length === 0 && (
                  <MenuItem disabled value=''>
                    {isLoadingSubjects
                      ? t('common.loading')
                      : t('common.noSubjects')}
                  </MenuItem>
                )}
                {Array.isArray(subjects) &&
                  subjects.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </s.InputContainer>
          <s.Description>{specializationStep.levelDescription}</s.Description>
          <s.InputContainer>
            <FormControl fullWidth margin='normal' variant='outlined'>
              <InputLabel id='proficiency-level-label'>
                {specializationStep.fieldLevel}
              </InputLabel>
              <Select
                label={specializationStep.fieldLevel}
                labelId='proficiency-level-label'
                onChange={(e) => {
                  setProficiencyLevel(e.target.value)
                  console.log('Selected proficiencyLevel:', e.target.value)
                }}
                value={proficiencyLevel}
              >
                {levelOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </s.InputContainer>
        </s.Content>
      </s.StepContainer>

      <s.StepContainer>
        <s.TitleHeader>
          <s.TitleIcon>2</s.TitleIcon>
          <s.Title>{parametersStep.title}</s.Title>
        </s.TitleHeader>
        <s.Content>
          <s.Description>{parametersStep.descriptions.title}</s.Description>
          <TextField
            fullWidth
            helperText={`${title.length}/100`}
            inputProps={{ maxLength: 100 }}
            label={parametersStep.fields.title}
            margin='normal'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
          />
          <s.Description>{parametersStep.descriptions.offer}</s.Description>
          <TextField
            fullWidth
            helperText={`${description.length}/1000`}
            inputProps={{ maxLength: 1000 }}
            label={parametersStep.fields.offer}
            margin='normal'
            multiline
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value)
            }}
            rows={4}
            value={description}
          />
          <s.Description>{parametersStep.descriptions.language}</s.Description>
          <FormControl fullWidth margin='normal' variant='outlined'>
            <InputLabel>{parametersStep.fields.language}</InputLabel>
            <Select
              MenuProps={{
                autoFocus: false
              }}
              label={parametersStep.fields.language}
              multiple
              onChange={(e: SelectChangeEvent<string[]>) => {
                const val = e.target.value
                setLanguages(typeof val === 'string' ? val.split(',') : val)
                setLanguageSelectOpen(false)
              }}
              onClose={() => setLanguageSelectOpen(false)}
              onOpen={() => setLanguageSelectOpen(true)}
              open={languageSelectOpen}
              renderValue={(selected) => selected.join(', ')}
              value={languages}
              variant='outlined'
            >
              {optionLanguages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <s.Description>{parametersStep.descriptions.price}</s.Description>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>₴</InputAdornment>
              )
            }}
            fullWidth
            label={parametersStep.fields.price}
            margin='normal'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPrice(e.target.value)
            }}
            value={price}
          />
        </s.Content>
      </s.StepContainer>

      <s.StepContainer>
        <s.TitleHeader>
          <s.TitleIcon>3</s.TitleIcon>
          <s.Title>{faqStep.title}</s.Title>
        </s.TitleHeader>
        <s.Description>{faqStep.descriptionTitle}</s.Description>
        <s.Content>
          {faqs.map((qa, idx) => (
            <div
              key={idx}
              style={{ position: 'relative', marginBottom: '1rem' }}
            >
              <TextField
                fullWidth
                label={faqStep.fieldQuestion}
                margin='normal'
                onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                placeholder={faqStep.fieldQuestion}
                value={qa.question}
                variant='outlined'
              />
              <TextField
                fullWidth
                label={faqStep.fieldAnswer}
                margin='normal'
                multiline
                onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                placeholder={faqStep.fieldAnswer}
                rows={4}
                value={qa.answer}
                variant='outlined'
              />
              {faqs.length > 1 && (
                <IconButton
                  aria-label='remove question'
                  onClick={() => removeFaq(idx)}
                  size='small'
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <CloseIcon fontSize='small' />
                </IconButton>
              )}
            </div>
          ))}
          <s.AddQuestionButton
            disabled={faqs.length >= 5}
            onClick={addFaq}
            type='button'
          >
            {faqStep.addButton}
          </s.AddQuestionButton>
        </s.Content>
      </s.StepContainer>

      <s.ButtonContainer>
        <s.SubmitButton disabled={isSubmitting} type='submit'>
          {isSubmitting ? t('common.submitting') : button.submit}
        </s.SubmitButton>
      </s.ButtonContainer>
    </form>
  )
}

export default CreateOfferOrRequestForm
