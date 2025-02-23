import { flexRender, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PropTypes from 'prop-types'
import { Button } from './ui/button'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuContent } from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Plus } from 'lucide-react'
import { Sheet, SheetTrigger } from './ui/sheet'
import AddPaperForm from './AddPaperForm'

export function DataTable({ columns, fetchPapers, data }) {
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      columnFilters
    }
  })

  return (
    <div className='relative w-full md:max-w-6xl overflow-auto'>
      <div className='flex flex-col md:flex-row md:items-center justify-between px-2'>
        <div className='flex items-center py-2 md:py-4'>
          <Input
            placeholder='Filter title...'
            value={table.getColumn('title')?.getFilterValue() ?? ''}
            onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
            className='w-full'
          />
        </div>

        <div className='flex flex-row gap-4 py-2 md:py-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className=''
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.columnDef.header}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='ml-auto'>
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  <Plus />
                  Add paper
                </Button>
              </SheetTrigger>
              <AddPaperForm fetchPapers={fetchPapers} />
            </Sheet>
          </div>
        </div>
      </div>
      <div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='overflow-x-auto'>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  fetchPapers: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
}
