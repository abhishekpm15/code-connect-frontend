import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paginations = ({ startIndex, setStartIndex, endIndex, setEndIndex, rowsPerPage, postLength }) => {
  const totalPages = Math.ceil(postLength / rowsPerPage);
  const currentPage = Math.floor(startIndex / rowsPerPage) + 1;

  const handleNext = () => {
    if (endIndex < postLength) {
      setStartIndex(startIndex + rowsPerPage);
      setEndIndex(endIndex + rowsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - rowsPerPage);
      setEndIndex(endIndex - rowsPerPage);
    }
  };

  return (
    <Pagination className="flex space-x-2">
      <PaginationPrevious onClick={handlePrev} disabled={startIndex === 0} className="cursor-default">
        Previous
      </PaginationPrevious>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationLink
          key={index}
          href="#"
          isActive={index === currentPage - 1}
          onClick={() => {
            setStartIndex(index * rowsPerPage);
            setEndIndex((index + 1) * rowsPerPage);
          }}
        >
          {index + 1}
        </PaginationLink>
      ))}
      <PaginationNext onClick={handleNext} disabled={endIndex >= postLength}  className="cursor-default">
        Next
      </PaginationNext>
    </Pagination>
  );
};

export default Paginations;
