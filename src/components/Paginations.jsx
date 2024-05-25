import React from "react";
import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paginations = ({ currentPage, setCurrentPage, totalPages }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Pagination className="flex space-x-2">
      <PaginationPrevious
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="cursor-default"
      >
        Previous
      </PaginationPrevious>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationLink
          className="cursor-pointer"
          key={index}
          isActive={index + 1 === currentPage}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </PaginationLink>
      ))}
      <PaginationNext
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="cursor-default"
      >
        Next
      </PaginationNext>
    </Pagination>
  );
};

export default Paginations;
