import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { Form } from './ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { GRADE_LEVELS, RESEARCH_TYPES, STRANDS } from '@/constants/filter_options'
import DynamicInputField from './DynamicInputField'
import InputField from './InputField'
import SelectField from './SelectField'
import { supabase } from '@/supabaseClient'
import PropTypes from 'prop-types'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_FILE_TYPES = ['application/pdf']

const formSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  abstract: z.string().trim().min(1, 'Abstract is required'),
  keywords: z
    .array(
      z.object({
        keyword: z.string().trim().min(1, 'Keyword is required')
      })
    )
    .min(1, 'At least 1 keyword is required'),
  authors: z
    .array(
      z.object({
        name: z.string().trim().min(1, 'Author name is required')
      })
    )
    .min(1, 'At least 1 author is required'),
  adviser: z.string().trim().min(1, 'Adviser is required'),
  grade_level: z.string().trim().min(1, 'Grade level is required'),
  research_type: z.string().trim().min(1, 'Research type is required'),
  strand: z.string().trim().min(1, 'Strand is required'),
  file: z
    .instanceof(FileList)
    .transform((val) => {
      if (val instanceof File) return val
      if (val instanceof FileList) return val[0]
      return null
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), 'Only .pdf format is supported')
})

const AddPaperForm = ({ fetchPapers }) => {
  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      abstract: '',
      keywords: [{ keyword: '' }],
      authors: [{ name: '' }],
      adviser: '',
      research_type: '',
      grade_level: '',
      strand: '',
      file: ''
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form

  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor
  } = useFieldArray({
    control,
    name: 'authors'
  })

  const {
    fields: keywordFields,
    append: appendKeyword,
    remove: removeKeyword
  } = useFieldArray({
    control,
    name: 'keywords'
  })

  const uploadFile = async (file) => {
    const { data, error } = await supabase.storage.from('research-bucket').upload(`papers/${file.name}`, file, {
      upsert: true
    })
    if (error) {
      console.error(error)
      return
    }
    return data
  }

  const onSubmit = async (values) => {
    const filePath = await uploadFile(values.file)

    const { data, error } = await supabase
      .from('papers')
      .insert([
        {
          title: values.title,
          authors: values.authors.map((author) => author.name),
          abstract: values.abstract,
          keywords: values.keywords.map((keyword) => keyword.keyword),
          strand: values.strand,
          grade_level: parseInt(values.grade_level),
          research_type: values.research_type,
          url: import.meta.env.VITE_SUPABASE_BUCKET_URL + filePath.path,
          adviser: values.adviser
        }
      ])
      .select()

    if (data) {
      fetchPapers()
    } else {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <SheetContent className='flex flex-col'>
        <div className='overflow-auto px-2'>
          <SheetHeader>
            <SheetTitle>Add Paper</SheetTitle>
            <SheetDescription>Add details of the new paper here. Click add when you&apos;re done.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            {/* Title Field */}
            <InputField control={form.control} name='title' label='Title' />

            {/* Abstract Field */}
            <InputField control={form.control} name='abstract' label='Abstract' inputType='textarea' />

            {/* Keywords Fields */}
            <DynamicInputField
              name='keywords'
              label='Keywords'
              form={form}
              errors={errors}
              objField='keyword'
              fields={keywordFields}
              append={() => appendKeyword({ value: '' })}
              remove={removeKeyword}
            />

            {/* Authors Fields */}
            <DynamicInputField
              name='authors'
              label='Author'
              form={form}
              errors={errors}
              objField='name'
              fields={authorFields}
              append={() => appendAuthor({ value: '' })}
              remove={removeAuthor}
            />

            {/* Adviser Field */}
            <InputField control={form.control} name='adviser' label='Adviser' />

            {/* Research Type Field */}
            <SelectField
              name='research_type'
              label='Research Type'
              control={form.control}
              options={RESEARCH_TYPES}
              placeholder='Select research type...'
              errors={errors}
            />

            {/* Grade Level Field */}
            <SelectField
              name='grade_level'
              label='Grade Level'
              control={form.control}
              options={GRADE_LEVELS}
              placeholder='Select grade level...'
              errors={errors}
            />

            {/* Strand Field */}
            <SelectField
              name='strand'
              label='Strand'
              control={form.control}
              options={STRANDS}
              placeholder='Select strand...'
              errors={errors}
            />

            {/* File Field */}
            <InputField name='file' label='File' control={form.control} register={form.register} inputType='file' />

            {/* Footer with Submit Button */}
            <SheetFooter>
              <Button type='submit'>Add</Button>
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Form>
  )
}

AddPaperForm.propTypes = {
  fetchPapers: PropTypes.func.isRequired
}

export default AddPaperForm
