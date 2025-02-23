import { FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select' // Assuming your Select components are in the ui/select
import PropTypes from 'prop-types'

const SelectField = ({ name, label, control, options, placeholder, errors, className = 'w-50' }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select {...field} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger id={name} className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem key='reset' value={null}>
                {placeholder || 'Select an option'}
              </SelectItem>

              {Object.entries(options).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage>{errors?.[name]?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default SelectField
