import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import PropTypes from 'prop-types'

const DynamicInputField = ({
  name,
  label,
  form,
  errors,
  objField,
  fields,
  append,
  remove,
  inputType = 'text',
  validation = {
    required: {
      value: true,
      message: 'This field is required'
    },
    validate: (value) => value.trim() !== '' || 'Field cannot be empty'
  }
}) => {
  return (
    <div className='flex flex-col'>
      <FormLabel>{label}</FormLabel>
      {fields.map((item, index) => (
        <FormItem key={item.id} className='py-1'>
          <FormLabel>
            {label} {index + 1}
          </FormLabel>
          <div className='flex flex-row gap-2'>
            <FormControl>
              <Input
                {...form.control.register(`${name}.${index}.${objField}`, validation)}
                defaultValue={item.value || ''}
                type={inputType}
                required={validation.required}
              />
            </FormControl>
            <Button variant='ghost' className='text-red-500' onClick={() => remove(index)} disabled={fields.length === 1}>
              <Trash />
            </Button>
          </div>
          <FormMessage>{errors?.[name]?.[index]?.[objField]?.message}</FormMessage>
        </FormItem>
      ))}

      <Button onClick={append} className='max-w-30 mt-2'>
        Add {label}
      </Button>
    </div>
  )
}

DynamicInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  objField: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  append: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  inputType: PropTypes.string,
  validation: PropTypes.object
}

export default DynamicInputField
