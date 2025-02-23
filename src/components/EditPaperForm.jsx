import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { Form, FormItem, FormLabel } from './ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { GRADE_LEVELS, RESEARCH_TYPES, STRANDS } from '@/constants/filter_options'
import DynamicInputField from './DynamicInputField'
import InputField from './InputField'
import SelectField from './SelectField'
import { supabase } from '@/supabaseClient'
import PropTypes from 'prop-types'

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
  strand: z.string().trim().min(1, 'Strand is required')
})

const EditPaperForm = ({ paper, fetchPapers }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: paper.title || '',
      abstract: paper.abstract || '',
      keywords: paper.keywords.map((item) => ({ keyword: item })) || [{ keyword: '' }],
      authors: paper.authors.map((item) => ({ name: item })) || [{ name: '' }],
      adviser: paper.adviser || '',
      research_type: paper.research_type || '',
      grade_level: paper.grade_level.toString() || '',
      strand: paper.strand || ''
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

  const onSubmit = async (values) => {
    const { data, error } = await supabase
      .from('papers')
      .update([
        {
          title: values.title,
          authors: values.authors.map((author) => author.name),
          abstract: values.abstract,
          keywords: values.keywords.map((keyword) => keyword.keyword),
          strand: values.strand,
          grade_level: parseInt(values.grade_level),
          research_type: values.research_type,
          adviser: values.adviser
        }
      ])
      .eq('id', paper.id)
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
            <SheetTitle>Edit Paper</SheetTitle>
            <SheetDescription>Edit details of the paper here. Click save when you&apos;re done.</SheetDescription>
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
            <FormItem>
              <FormLabel>File</FormLabel>
              <div className='flex flex-row justify-between mt-4 min-w-full p-4 border border-neutral-200 rounded-md shadow'>
                {paper.url ? paper.url.split('/')[paper.url.split('/').length - 1] : 'No file uploaded'}
              </div>
            </FormItem>

            {/* Footer with Submit Button */}
            <SheetFooter>
              <Button type='submit'>Save</Button>
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Form>
  )
}

EditPaperForm.propTypes = {
  paper: PropTypes.object.isRequired,
  fetchPapers: PropTypes.func.isRequired
}

export default EditPaperForm
