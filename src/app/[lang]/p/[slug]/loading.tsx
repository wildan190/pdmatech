import { Skeleton } from "@/components/ui/skeleton";

export default function CustomPageLoading() {
  return (
    <main className="flex-grow bg-background pb-20">
      <div className="bg-secondary/50 py-4 border-b">
        <div className="container">
          <Skeleton className="h-5 w-48" />
        </div>
      </div>

      <div className="container mt-12 md:mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-12 w-1/2 mx-auto" />
            <Skeleton className="h-1 w-24 mx-auto mt-8" />
          </div>

          <div className="space-y-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-64 w-full rounded-2xl my-10" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </div>
      </div>
    </main>
  );
}
