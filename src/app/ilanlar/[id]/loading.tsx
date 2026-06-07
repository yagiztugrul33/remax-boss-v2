export default function ListingDetailLoading() {
  return (
    <>
      {/* Back link skeleton */}
      <div className="container-page py-5">
        <div className="h-4 w-28 rounded-full bg-line animate-pulse" />
      </div>

      {/* Gallery skeleton */}
      <div className="container-page pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 animate-pulse">
          <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[340px] rounded-3xl bg-mist" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-line/60" />
            ))}
          </div>
        </div>
      </div>

      {/* Title + price card skeleton */}
      <div className="container-page py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 animate-pulse">
          <div className="space-y-4">
            <div className="h-3.5 w-20 rounded-full bg-line" />
            <div className="h-10 w-3/4 rounded-xl bg-line" />
            <div className="h-4 w-1/3 rounded-full bg-line/70" />
          </div>
          <div className="rounded-3xl border border-line bg-navy-900/5 p-6 space-y-4">
            <div className="h-3 w-10 rounded-full bg-line" />
            <div className="h-8 w-2/5 rounded-xl bg-line" />
            <div className="h-11 w-full rounded-xl bg-line" />
            <div className="h-11 w-full rounded-xl bg-line/60" />
          </div>
        </div>
      </div>

      {/* Facts skeleton */}
      <div className="bg-mist py-12">
        <div className="container-page animate-pulse">
          <div className="h-3.5 w-24 rounded-full bg-line mb-4" />
          <div className="h-8 w-48 rounded-xl bg-line mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-line bg-white p-4 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-line" />
                <div className="h-2.5 w-2/3 rounded-full bg-line" />
                <div className="h-4 w-4/5 rounded-full bg-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
