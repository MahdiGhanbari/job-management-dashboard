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


interface PaginationProps {
  currentPage: number
  totalItems: number
  perPage: number
  visiblePage?: number
  onPageChange: (page: number) => void
  className?: string
}

export function Paginate({ currentPage, totalItems, perPage, visiblePage = 3, onPageChange, className}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / perPage)
  const half = Math.floor(visiblePage / 2)
  const start = Math.max(currentPage - half - 1, 1)
  const end = Math.min(start + visiblePage - 1, totalPages)

  const pages = Array.from(
    { length: Math.min(visiblePage, totalPages) },
     (_, index) => start + index )
  const showStartDots = start > 1
  const showEndDots = end < totalPages
  

  function onPrev() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  function onNext() {
    if (currentPage <  totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
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
              onClick={() => onPageChange(page)}>
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
          <PaginationNext onClick={onNext}/>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
