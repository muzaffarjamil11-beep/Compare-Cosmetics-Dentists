"use client";

import { useState } from "react";

const INITIAL_VISIBLE = 21;

export type ColumnLink = { label: string; href: string };

export default function LinkColumns({
  title,
  items,
}: {
  title: string;
  /** Plain objects, not a builder function — this is a Client Component. */
  items: ColumnLink[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, INITIAL_VISIBLE);
  const hasMore = items.length > INITIAL_VISIBLE;

  return (
    <section>
      <h2 className="text-[20px] font-bold tracking-[-0.44px] text-navy sm:text-[22px]">
        {title}
      </h2>

      <ul className="mt-[18px] grid grid-cols-1 gap-x-8 gap-y-[10px] sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[15px] leading-[1.5] tracking-[-0.3px] text-primary transition-opacity hover:opacity-70 hover:underline sm:text-[16px]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-[18px] flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="cursor-pointer rounded-full border border-navy/20 px-[14px] py-[5px] text-[12px] tracking-[-0.24px] text-navy transition-colors hover:bg-primary-light"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </section>
  );
}
