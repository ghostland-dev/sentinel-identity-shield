
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const UsersPagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  handlePreviousPage,
  handleNextPage
}: UsersPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={handlePreviousPage} 
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink 
                  isActive={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          }
          
          if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
            return (
              <PaginationItem key={`ellipsis-${pageNumber}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          
          return null;
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={handleNextPage}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default UsersPagination;
