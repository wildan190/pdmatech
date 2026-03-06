import { Skeleton } from "@/components/ui/skeleton";

export default function NewsDetailLoading() {
  return (
    <main className="flex-grow bg-background pb-20">
      <div className="bg-secondary/50 py-4 border-b">
        <div className="container">
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      <div className="container mt-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-6 w-32 mb-8" />
          
          <Skeleton className="aspect-video w-full rounded-2xl mb-10" />

          <div className="mb-10 space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-12 w-full md:w-3/4" />
            <Skeleton className="h-12 w-1/2" />
          </div>

          <div className="space-y-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="grid grid-cols-3 gap-4 pt-10">
               <Skeleton className="h-32 w-full rounded-xl" />
               <Skeleton className="h-32 w-full rounded-xl" />
               <Skeleton className="h-32 w-full rounded-xl" />
            </div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
