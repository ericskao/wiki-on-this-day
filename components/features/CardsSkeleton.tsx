import { Skeleton } from '../ui/skeleton';

const CardsSkeleton = () => {
  return (
    <div className="flex gap-x-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="mb-4">
          <Skeleton className="h-[20px] mb-4" />
          <div className="flex flex-col gap-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-[200px] h-[250px] rounded-xxl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsSkeleton;
