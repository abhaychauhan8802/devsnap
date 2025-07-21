import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = ({ type = "default" }) => {
  const isWide = type === "wide";

  return (
    <div className="w-full border p-5 rounded-xl bg-card">
      <div className={`flex gap-2 items-center `}>
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="w-20 h-3" />
      </div>
      <div
        className={`mt-4 flex  gap-8 ${isWide ? "flex-row justify-between" : "flex-col"}`}
      >
        <div className="flex-[65%] flex flex-col justify-between">
          <div>
            <Skeleton className="w-full h-6 rounded-full" />
            <Skeleton className="w-3/4 h-6 rounded-full mt-3" />
          </div>
          {isWide && (
            <div className="mb-3 flex gap-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          )}
        </div>
        <div
          className={`${isWide ? "flex-[35%] aspect-5/4" : "aspect-video"} rounded-xl`}
        >
          <Skeleton className="w-full h-full" />
        </div>
        {!isWide && (
          <div className="mb-3 flex gap-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSkeleton;
