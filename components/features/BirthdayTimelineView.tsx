import { WikiResponseInterface } from '@/context/BirthdayContext';
import { groupByYear } from '@/lib/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const BirthdayTimelineView = ({
  birthdays,
}: {
  birthdays: WikiResponseInterface[] | null;
}) => {
  const groupedBirthdays = groupByYear(birthdays);
  return (
    <div className="flex gap-x-4">
      {Object.values(groupedBirthdays).map((birthdays, index) => {
        return (
          <div key={index}>
            <h2 className="sticky top-0 text-center mb-4 text-lg font-semibold bg-white border-b border-b-gray-600">
              {birthdays[0].year}
            </h2>
            <ul className="flex flex-wrap item-stretch gap-3">
              {birthdays.map((birthday, index) => {
                const { description, extract, normalizedtitle } =
                  birthday.pages[0] || {}; // safely destructure in rare case there are no pages
                return (
                  <li key={index}>
                    <Card className="min-w-[200px] min-h-[250px]">
                      <CardHeader>
                        <CardTitle>
                          {normalizedtitle || birthday.text}
                        </CardTitle>
                        <CardDescription>{description}</CardDescription>
                      </CardHeader>
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

export default BirthdayTimelineView;
