export default function IlanlarLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-navy-900 py-20 md:py-28">
        <div className="container-page max-w-3xl space-y-4 animate-pulse">
          <div className="h-3 w-20 rounded-full bg-white/20" />
          <div className="h-12 w-2/3 rounded-xl bg-white/15" />
          <div className="h-4 w-1/2 rounded-full bg-white/10" />
        </div>
      </section>

      {/* Filter bar skeleton */}
      <div className="border-b border-line bg-white py-5">
        <div className="container-page space-y-4 animate-pulse">
          <div className="flex flex-wrap gap-2">
            {[56, 44, 40].map((w, i) => (
              <div
                key={i}
                className="h-8 rounded-full bg-line"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[40, 36, 48, 36, 44, 40, 52].map((w, i) => (
              <div
                key={i}
                className="h-6 rounded-full bg-line/60"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <div className="h-10 w-full rounded-lg bg-line/50" />
        </div>
      </div>

      {/* Listing grid skeleton */}
      <div className="container-page py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-line bg-mist/40 p-4 flex flex-col gap-3 animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="aspect-[4/3] rounded-xl bg-line" />
              <div className="space-y-2">
                <div className="h-2.5 w-1/3 rounded-full bg-line" />
                <div className="h-3.5 w-4/5 rounded-full bg-line" />
                <div className="h-2.5 w-2/3 rounded-full bg-line/70" />
              </div>
              <div className="mt-auto flex gap-2 pt-1">
                <div className="h-5 w-12 rounded-full bg-line" />
                <div className="h-5 w-12 rounded-full bg-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
