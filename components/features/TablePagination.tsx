import clsx from 'clsx';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

const TablePagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}) => {
  return (
    <Pagination className="mt-2">
      <PaginationContent className="cursor-pointer">
        <PaginationItem>
          <PaginationPrevious
            data-testid="previous-button"
            className={clsx({
              'cursor-default opacity-50': currentPage === 1,
            })}
            onClick={() => {
              if (currentPage === 1) return;
              setCurrentPage(currentPage - 1);
            }}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem
            key={index}
            className={clsx('hidden md:block', {
              block:
                currentPage === index + 1 ||
                currentPage === index ||
                currentPage === index - 1,
            })}
          >
            <PaginationLink
              onClick={() => {
                setCurrentPage(index + 1);
              }}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            data-testid="next-button"
            className={clsx({
              'cursor-default opacity-50': currentPage === totalPages,
            })}
            onClick={() => {
              if (currentPage === totalPages) return;
              setCurrentPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
