import Link from "next/link";

/** Window of page numbers around the current page. */
function pageWindow(page: number, totalPages: number, span = 5): number[] {
  const half = Math.floor(span / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + span - 1);
  start = Math.max(1, end - span + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = pageWindow(page, totalPages);
  const inert =
    "cursor-default text-[15px] tracking-[-0.3px] text-navy/35 sm:text-[17px]";
  const active =
    "cursor-pointer text-[15px] tracking-[-0.3px] text-navy transition-opacity hover:opacity-70 sm:text-[17px]";

  return (
    <nav
      aria-label="Search results pages"
      className="flex items-center justify-between gap-4"
    >
      {page > 1 ? (
        <Link href={buildHref(page - 1)} className={active} scroll={false}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={inert}>
          Previous
        </span>
      )}

      <div className="flex items-center gap-[6px]">
        {pages.map((n) => {
          const isCurrent = n === page;
          return isCurrent ? (
            <span
              key={n}
              aria-current="page"
              className="flex size-[36px] items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white sm:text-[17px]"
            >
              {n}
            </span>
          ) : (
            <Link
              key={n}
              href={buildHref(n)}
              aria-label={`Page ${n}`}
              scroll={false}
              className="flex size-[36px] items-center justify-center rounded-full text-[15px] tracking-[-0.3px] text-navy transition-colors hover:bg-primary-light sm:text-[17px]"
            >
              {n}
            </Link>
          );
        })}
      </div>

      {page < totalPages ? (
        <Link href={buildHref(page + 1)} className={active} scroll={false}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={inert}>
          Next
        </span>
      )}
    </nav>
  );
}
