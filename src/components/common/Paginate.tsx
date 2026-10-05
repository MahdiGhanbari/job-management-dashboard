"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import SelectInput from "./SelectInput"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"


export interface PaginationProps {
  totalItems: number
  visiblePage?: number
  className?: string
  perPageItems: Record<string, any>[]
}

export function Paginate({ totalItems, visiblePage = 3, className, perPageItems }: PaginationProps) {
  
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || 1)
  const perPage = Number(searchParams.get('limit') || 5)
  const router = useRouter()
  const [limit, setLimit] = useState(perPage)


  function reload(params: URLSearchParams) {
    router.push(`/jobs?${params.toString()}`)
  }
  function onChangePage(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    reload(params)
  }
  function onChangePerPage(limit: number) {
    setLimit(limit)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')
    params.set('limit', String(limit))
    reload(params)
  }



  const totalPages = Math.ceil(totalItems / perPage)
  const half = Math.floor(visiblePage / 2)
  const start = Math.max(currentPage - half - 1, 1)
  const end = Math.min(start + visiblePage - 1, totalPages)

  const pages = Array.from(
    { length: Math.min(visiblePage, totalPages) },
    (_, index) => start + index)
  const showStartDots = start > 1
  const showEndDots = end < totalPages


  function onPrev() {
    if (currentPage > 1) {
      onChangePage(currentPage - 1)
    }
  }

  function onNext() {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1)
    }
  }

  return (
    <div className="flex justify-between p-2">
       <SelectInput value={limit} items={perPageItems} onValueChange={onChangePerPage} className="max-w-50"/>
      <Pagination className={className}>
        <PaginationContent>

          <PaginationItem >
            <PaginationPrevious onClick={onPrev} aria-disabled={true} />
          </PaginationItem>

          {showStartDots && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink

                isActive={page === currentPage}
                onClick={() => onChangePage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {showEndDots && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext onClick={onNext} />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
     
    </div>
  )
}
