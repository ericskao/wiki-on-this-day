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
  {
    /* To-do need to handle pagination for different screen sizes */
  }
  return (
    <Pagination>
      <PaginationContent className="cursor-pointer">
        <PaginationItem>
          <PaginationPrevious
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
          <PaginationItem key={index}>
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
        <PaginationItem
          className={clsx({
            'cursor-default opacity-50': currentPage === totalPages,
          })}
          onClick={() => {
            if (currentPage === totalPages) return;
            setCurrentPage(currentPage + 1);
          }}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
