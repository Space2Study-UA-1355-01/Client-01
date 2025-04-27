import { Fragment } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { createFilterOptions, FilterOptionsState } from '@mui/material'
import Loader from '~/components/loader/Loader'

interface OptionType {
  title: string
  value: string
}

interface AppAutoCompleteProps {
  options?: OptionType[]
  filterOptions?: (
    options: OptionType[],
    state: FilterOptionsState<OptionType>
  ) => OptionType[]
  ListboxProps?: object
  hideClearIcon?: boolean
  textFieldProps?: object
  loading?: boolean
  disabled?: boolean
  value?: OptionType | null
  onChange?: (event: React.SyntheticEvent, value: OptionType | null) => void
  getOptionLabel?: (option: OptionType) => string
  isOptionEqualToValue?: (option: OptionType, value: OptionType) => boolean
}

const defaultFilterOptions = (
  options: OptionType[],
  state: FilterOptionsState<OptionType>
) => {
  const filter = createFilterOptions<OptionType>()
  return filter(options, state)
}

const AppAutoCompleteCategories: React.FC<AppAutoCompleteProps> = ({
  filterOptions = defaultFilterOptions,
  ListboxProps = { style: { maxHeight: '140px' } },
  options = [],
  hideClearIcon = false,
  textFieldProps = {},
  loading = false,
  ...props
}) => {
  return (
    <Autocomplete
      ListboxProps={ListboxProps}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      options={options}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <Loader size={20} sx={{ color: 'primary.600' }} />
                ) : null}
                {!hideClearIcon && params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}

export default AppAutoCompleteCategories
