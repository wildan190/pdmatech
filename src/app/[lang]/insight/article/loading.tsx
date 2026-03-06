import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleLoading() {
  return (
    <main className="flex-grow bg-background">
      <div className="bg-secondary/50 py-4 border-b">
        <div className="container">
          <Skeleton className="h-5 w-48" />
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="container text-center">
          <Skeleton className="mx-auto h-12 w-12 rounded-full mb-6" />
          <Skeleton className="mx-auto h-10 w-64 md:w-96 mb-4" />
          <Skeleton className="mx-auto h-6 w-full max-w-2xl" />
          
          <div className="mt-10 max-w-xl mx-auto">
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="h-56 w-full rounded-lg" />
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
