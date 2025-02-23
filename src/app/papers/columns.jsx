import { STRANDS } from '@/constants/filter_options'
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { encodeUUID } from '@/lib/utils'
import { supabase } from '@/supabaseClient'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import EditPaperForm from '@/components/EditPaperForm'

export const columns = (fetchPapers) => [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <div className='w-50 md:w-100'>{row.getValue('title')}</div>
    }
  },
  {
    accessorKey: 'authors',
    header: 'Authors',
    cell: ({ row }) => {
      return <div className='w-30 md:w-70'>{row.getValue('authors').join(', ')}</div>
    }
  },
  {
    accessorKey: 'grade_level',
    header: 'Level',
    cell: ({ row }) => {
      return <div className='w-20'>Grade {row.getValue('grade_level')}</div>
    }
  },
  {
    accessorKey: 'strand',
    header: 'Strand',
    cell: ({ row }) => {
      return <div className='w-30'>{STRANDS[row.getValue('strand')]}</div>
    }
  },
  {
    accessorKey: 'research_type',
    header: 'Research Type',
    cell: ({ row }) => {
      const researchType = row.getValue('research_type')
      const capitalized = researchType.charAt(0).toUpperCase() + researchType.slice(1)
      return <div className='w-25'>{capitalized}</div>
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const paper = row.original

      const handleDelete = async () => {
        await supabase.from('papers').delete().eq('id', paper.id)
        fetchPapers()
      }

      return (
        <Sheet>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link to={`/${encodeUUID(paper.id)}`} className='flex flex-row'>
                  <DropdownMenuItem>
                    <Eye />
                    View paper
                  </DropdownMenuItem>
                </Link>
                <SheetTrigger asChild>
                  <DropdownMenuItem>
                    <Edit />
                    Edit paper
                  </DropdownMenuItem>
                </SheetTrigger>
                <AlertDialogTrigger>
                  <DropdownMenuItem className='text-red-500'>
                    <Trash />
                    Delete paper
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete <i> &lsquo;{paper.title}&rsquo;</i>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the paper. Are you sure you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant='destructive' onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <EditPaperForm paper={paper} fetchPapers={fetchPapers} />
        </Sheet>
      )
    }
  }
]
