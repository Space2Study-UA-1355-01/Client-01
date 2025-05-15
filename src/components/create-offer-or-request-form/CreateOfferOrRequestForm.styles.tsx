import { styled } from '@mui/material/styles'

export const FormContainer = styled('form')`
  width: 675px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const StepContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 34px;
  padding: 16px 0;
`
export const TitleHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`
export const TitleIcon = styled('div')`
  width: 20px;
  height: 20px;
  border: 1px solid #455a64;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500px;
  color: #455a64;
`

export const Title = styled('h5')`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: #455a64;
`
export const Description = styled('p')`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #455a64;
`
export const Content = styled('div')`
  padding: 15px, 0;
  padding-left: 34px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`
export const InputContainer = styled('div')`
  width: 510px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const AddQuestionButton = styled('button')`
  background: #eceff1;
  color: #263238;
  padding: 7px 24px;
  border: none;
  border-radius: 4px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  text-transform: none;
  &:hover {
    background: #cfd8dc;
  }
`

export const ButtonContainer = styled('div')`
  display: flex;
  justify-content: flex;
  gap: 8px;
  margin-top: 16px;
`

export const SubmitButton = styled('button')`
  background: #263238;
  color: #ffffff;
  padding: 16px 32px;
  border: none;
  border-radius: 4px;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  text-transform: none;
  &:hover {
    background: #1a2226;
  }
`

export const DraftButton = styled('button')`
  background: #cfd8dc;
  color: #263238;
  padding: 16px 32px;
  border: none;
  border-radius: 4px;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  text-transform: none;
  &:hover {
    background: #90a4ae;
  }
`
