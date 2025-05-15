export interface LevelOption {
  value: string
  label: string
}

export const levelOptions: LevelOption[] = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Test Preparation', label: 'Test Preparation' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Specialized', label: 'Specialized' }
]

export const optionLanguages: string[] = ['English', 'Ukrainian']

export const validProficiencyLevels: string[] = levelOptions.map(
  (opt) => opt.value
)
