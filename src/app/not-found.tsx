import Link from "next/link";
import { Home, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/server";

export default async function NotFound() {
  const d = (await getDictionary()).pages.notFound;

  return (
    <section className="relative isolate min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-navy-900 text-white px-4 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -start-20 w-[28rem] h-[28rem] rounded-full bg-remax-blue/15 blur-3xl -z-10"
      />

      <div
        aria-hidden
        className="font-display text-[8rem] sm:text-[10rem] font-extrabold leading-none text-remax-red/15 select-none mb-2 tracking-tighter"
      >
        404
      </div>

      <h1 className="font-display text-display-lg text-white text-balance">
        {d.title}
      </h1>

      <p className="mt-4 text-white/65 max-w-md leading-relaxed">
        {d.desc}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-remax-red hover:bg-remax-red-hover text-white h-11 px-6 text-sm font-semibold",
          )}
        >
          <Home className="h-4 w-4 me-2" aria-hidden />
          {d.home}
        </Link>
        <Link
          href="/ilanlar"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white h-11 px-6 text-sm font-semibold",
          )}
        >
          <Search className="h-4 w-4 me-2" aria-hidden />
          {d.viewListings}
        </Link>
      </div>
    </section>
  );
}
