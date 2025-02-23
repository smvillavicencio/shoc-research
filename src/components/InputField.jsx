import PropTypes from 'prop-types'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const InputField = ({ name, label, control, register = null, required = true, inputType = 'text' }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='!text-current'>{label}</FormLabel>
          <FormControl>
            {inputType === 'textarea' ? (
              <Textarea {...field} required={required} className='h-80' />
            ) : inputType === 'file' ? (
              <div>
                <Input
                  {...register(name)}
                  required={required}
                  type='file'
                  accept='application/pdf'
                  onChange={(event) => {
                    if (event.target?.files) {
                      field.onChange(event.target.files[0])
                    }
                  }}
                />
                <br />
                <small>
                  <strong>IMPORTANT:</strong>
                </small>
                <small> Make sure to upload the correct file. You cannot edit this once you click the add button.</small>
              </div>
            ) : (
              <Input {...field} required={required} />
            )}
          </FormControl>
          {inputType !== 'file' && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  register: PropTypes.object,
  required: PropTypes.bool,
  inputType: PropTypes.string
}

export default InputField
