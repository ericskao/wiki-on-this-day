import { fireEvent, render, screen } from '@testing-library/react';
import TablePagination from '../TablePagination';

describe('TablePagination', () => {
  const mockSetCurrentPage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    render(
      <TablePagination
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        totalPages={5}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    render(
      <TablePagination
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        totalPages={5}
      />
    );

    const previousButton = screen.getByTestId('previous-button');
    expect(previousButton).toHaveClass('opacity-50');
  });

  it('disables Next button on last page', () => {
    render(
      <TablePagination
        currentPage={5}
        setCurrentPage={mockSetCurrentPage}
        totalPages={5}
      />
    );

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toHaveClass('opacity-50');
  });

  it('calls setCurrentPage with correct value when a page number is clicked', () => {
    render(
      <TablePagination
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it('calls setCurrentPage with correct value when Next is clicked', () => {
    render(
      <TablePagination
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it('calls setCurrentPage with correct value when Previous is clicked', () => {
    render(
      <TablePagination
        currentPage={3}
        setCurrentPage={mockSetCurrentPage}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it('does not call setCurrentPage when Previous is clicked on first page', () => {
    render(
      <TablePagination
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(mockSetCurrentPage).not.toHaveBeenCalled();
  });

  it('does not call setCurrentPage when Next is clicked on last page', () => {
    render(
      <TablePagination
        currentPage={5}
        setCurrentPage={mockSetCurrentPage}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockSetCurrentPage).not.toHaveBeenCalled();
  });
});
