'use client';

import { useBirthdayContext } from '@/app/context/AppContext';
import { groupByYear } from '@/lib/utils';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const BirthdayList = () => {
  const { birthdays, loading } = useBirthdayContext();
  const groupedBirthdays = groupByYear(birthdays);
  console.log('grouped bdays', groupedBirthdays);
  // const sortedBirthdays = sortBirthdays(birthdays);
  // console.log('sorted bdays', sortedBirthdays);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {Object.values(groupedBirthdays).map((birthdays, index) => {
        console.log('birthdays', birthdays);
        return (
          <div key={index}>
            <h2>{birthdays[0].year}</h2>
            <ul className="flex flex-wrap item-stretch gap-x-3">
              {birthdays.map((birthday, index) => {
                const { description, extract, normalizedtitle } =
                  birthday.pages[0] || {}; // safely destructure in rare case there are no pages
                return (
                  <li key={index} className="items-stretch basis-[250px]">
                    <Card className="h-[160px]">
                      <CardHeader>
                        <CardTitle className="line-clamp-3">
                          {birthday.text}
                        </CardTitle>
                        <CardDescription>{description}</CardDescription>
                      </CardHeader>
                      {/* <CardContent>{extract}</CardContent> */}
                      <CardFooter></CardFooter>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default BirthdayList;
