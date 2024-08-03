import { WikiResponseInterface } from '@/context/BirthdayContext';
import { sortBirthdays } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const BirthdayTableView = ({
  birthdays,
}: {
  birthdays: WikiResponseInterface[] | null;
}) => {
  const sortedBirthdays = sortBirthdays(birthdays);
  return (
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
        {sortedBirthdays.map((birthday, index) => {
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
      <TableFooter>pagination here?</TableFooter>
    </Table>
  );
};

export default BirthdayTableView;
