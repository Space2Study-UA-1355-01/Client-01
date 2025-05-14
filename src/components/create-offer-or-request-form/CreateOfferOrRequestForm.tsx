import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'
import * as s from '~/components/create-offer-or-request-form/CreateOfferOrRequestForm.styles'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import CloseIcon from '@mui/icons-material/Close'
import {
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material'

export type Role = 'tutor' | 'student'
interface QA {
  question: string
  answer: string
}
interface FormProps {}

const CreateOfferOrRequestForm: FC<FormProps> = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((sate) => sate.appMain) as {
    userRole: Role
  }
  const raw = t('common.levels', { returnObjects: true })
  const rawLevels = raw as unknown as Record<string, string>

  const levelOptions = useMemo(
    () =>
      Object.entries(rawLevels).map(([value, label]) => ({
        value,
        label
      })),
    [rawLevels]
  )

  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [levels, setLevels] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [faqs, setFaqs] = useState<QA[]>([{ question: '', answer: '' }])
  const addFaq = () => setFaqs((f) => [...f, { question: '', answer: '' }])
  const removeFaq = (i: number) =>
    setFaqs((f) => f.filter((_, idx) => idx !== i))
  const updateFaq = (i: number, field: keyof QA, val: string) =>
    setFaqs((f) => f.map((q, idx) => (idx === i ? { ...q, [field]: val } : q)))

  const formHeader = {
    title: t(`offerPage.createOffer.title.${userRole}`),
    description: t(`offerPage.createOffer.description.${userRole}`)
  }
  const specializationStep = {
    title: t(`offerPage.title.firstStep.${userRole}`),
    description: t(`offerPage.description.category.${userRole}`),
    fieldCategory: t(`offerPage.labels.category`),
    fieldSubject: t(`offerPage.labels.subject`),
    levelDescription: t(`offerPage.description.level.${userRole}`)
  }
  const parametersStep = {
    title: t(`offerPage.title.secondStep.${userRole}`),
    descriptions: {
      title: t(`offerPage.description.title.${userRole}`),
      offer: t(`offerPage.description.describe.${userRole}`),
      language: t(`offerPage.description.languages.${userRole}`),
      price: t(`offerPage.description.price.${userRole}`)
    },
    fields: {
      title: t(`offerPage.labels.title`),
      offer: t(`offerPage.labels.describe.${userRole}`),
      language: t(`offerPage.labels.language`),
      price: t(`offerPage.labels.price`)
    }
  }
  const faqStep = {
    title: t(`offerPage.title.thirdStep`),
    descriptionTitle: t(`offerPage.description.thirdStep.${userRole}`),
    fieldQuestion: t(`offerPage.labels.question`),
    fieldAnswer: t(`offerPage.labels.answer`),
    addButton: t(`button.addQuestion`)
  }
  const button = {
    submit: t(`offerPage.createOffer.buttonTitles.${userRole}`),
    draft: t(`button.addToDrafts`)
  }
  return (
    <s.FormContainer>
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
                displayEmpty
                label={specializationStep.fieldCategory}
                labelId='category-label'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {/* TODO: fetch categories from the backend and render */}
              </Select>
            </FormControl>
          </s.InputContainer>
          <s.InputContainer>
            <FormControl fullWidth margin='normal' variant='outlined'>
              <InputLabel id='subject-label'>
                {specializationStep.fieldSubject}
              </InputLabel>
              <Select
                disabled={!category}
                displayEmpty
                label={specializationStep.fieldSubject}
                labelId='subject-label'
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              >
                {/* TODO: fetch subjects for the selected category from the backend and render*/}
              </Select>
            </FormControl>
          </s.InputContainer>
          <s.Description>{specializationStep.levelDescription}</s.Description>
          <FormGroup>
            {levelOptions.map((opt) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={levels.includes(opt.value)}
                      name={opt.value}
                      onChange={(e) => {
                        const checked = e.target.checked
                        if (checked) {
                          setLevels((prev) => [...prev, opt.value])
                        } else {
                          setLevels((prev) =>
                            prev.filter((l) => l !== opt.value)
                          )
                        }
                      }}
                    />
                  }
                  key={opt.value}
                  label={opt.label}
                />
              )
            })}
          </FormGroup>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            rows={4}
            value={description}
          />

          <s.Description>{parametersStep.descriptions.language}</s.Description>
          <FormControl fullWidth margin='normal'>
            <InputLabel>{parametersStep.fields.language}</InputLabel>
            <Select
              label={parametersStep.fields.language}
              multiple
              onChange={(e: SelectChangeEvent<string[]>) => {
                const val = e.target.value
                setLanguages(typeof val === 'string' ? val.split(',') : val)
              }}
              renderValue={(selected) => selected.join(', ')}
              value={languages}
              variant='outlined'
            >
              {/* TODO: fetch languages from the backend and render*/}
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
            margin='normal'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
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
          <s.AddQuestionButton onClick={addFaq} type='button'>
            {faqStep.addButton}
          </s.AddQuestionButton>
        </s.Content>
      </s.StepContainer>

      <s.ButtonContainer>
        <s.SubmitButton
          onClick={() => {
            /* TODO: submit */
          }}
        >
          {button.submit}
        </s.SubmitButton>
        <s.DraftButton
          onClick={() => {
            /* TODO: save draft */
          }}
        >
          {button.draft}
        </s.DraftButton>
      </s.ButtonContainer>
    </s.FormContainer>
  )
}

export default CreateOfferOrRequestForm
