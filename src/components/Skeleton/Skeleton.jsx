const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800 ${className}`}
  />
);

export const HomeSkeleton = () => (
  <div className="space-y-4 mt-2">
    <div className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-[#161b22]
      border border-gray-200 dark:border-gray-800">
      <Skeleton className="w-28 h-28 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-3 py-1">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <Skeleton className="h-4 w-32 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4 rounded-lg" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
    </div>
    <Skeleton className="h-72 w-full rounded-2xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-[#161b22]
    border border-gray-200 dark:border-gray-800">
    <Skeleton className="w-24 h-24 rounded-full flex-shrink-0" />
    <div className="flex-1 space-y-3 py-1">
      <Skeleton className="h-6 w-40 rounded-lg" />
      <Skeleton className="h-4 w-28 rounded-lg" />
      <Skeleton className="h-4 w-full rounded-lg" />
    </div>
  </div>
);

export default Skeleton;
