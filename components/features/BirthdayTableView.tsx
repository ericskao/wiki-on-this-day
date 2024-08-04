'use client';

import { WikiResponseInterface } from '@/context/BirthdayContext';
import { sortBirthdays } from '@/lib/utils';
import { useMemo, useState } from 'react';

import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import TablePagination from './TablePagination';

const ITEMS_PER_PAGE = 20;

const BirthdayTableView = ({
  birthdays,
}: {
  birthdays: WikiResponseInterface[] | null;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const sortedBirthdays = useMemo(
    () =>
      sortBirthdays(birthdays).filter(
        (b) =>
          b.text.toLowerCase().includes(search.toLowerCase()) ||
          b.year.toString().includes(search)
      ),
    [birthdays, search]
  );

  const totalPages = Math.ceil(sortedBirthdays.length / ITEMS_PER_PAGE);

  const currentPageData = useMemo(() => {
    const firstItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastItemIndex = firstItemIndex + ITEMS_PER_PAGE;
    return sortedBirthdays.slice(firstItemIndex, lastItemIndex);
  }, [currentPage, sortedBirthdays]);

  return (
    <>
      <Input
        type="search"
        placeholder="Search name or year"
        className="w-52"
        value={search}
        onChange={(e) => {
          setCurrentPage(1);
          setSearch(e.target.value);
        }}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Extract</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((birthday, index) => {
            const { description, extract, normalizedtitle } =
              birthday.pages[0] || {}; // safely destructure in rare case there are no pages
            return (
              <TableRow key={index}>
                <TableCell className="font-semibold">{birthday.text}</TableCell>
                <TableCell className="font-medium">{birthday.year}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell className="font-medium">{extract}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default BirthdayTableView;
