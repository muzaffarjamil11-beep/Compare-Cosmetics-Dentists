"use client";

import { useState } from "react";

const TOTAL_PAGES = 5;

export default function Pagination() {
  const [page, setPage] = useState(1);

  return (
    <nav
      aria-label="Search results pages"
      className="flex items-center justify-between gap-4"
    >
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="cursor-pointer text-[15px] tracking-[-0.3px] text-navy transition-opacity hover:opacity-70 disabled:cursor-default disabled:opacity-35 sm:text-[17px]"
      >
        Previous
      </button>

      <div className="flex items-center gap-[6px]">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((n) => {
          const isCurrent = n === page;
          return (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={isCurrent ? "page" : undefined}
              aria-label={`Page ${n}`}
              className={`flex size-[36px] cursor-pointer items-center justify-center rounded-full text-[15px] tracking-[-0.3px] transition-colors sm:text-[17px] ${
                isCurrent
                  ? "bg-primary font-bold text-white"
                  : "text-navy hover:bg-primary-light"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
        disabled={page === TOTAL_PAGES}
        className="cursor-pointer text-[15px] tracking-[-0.3px] text-navy transition-opacity hover:opacity-70 disabled:cursor-default disabled:opacity-35 sm:text-[17px]"
      >
        Next
      </button>
    </nav>
  );
}
