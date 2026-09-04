"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavSection = {
  label: string;
  /** The hub page: a full list of everything in this section. */
  href: string;
  /** A short preview shown in the dropdown. */
  items: { label: string; href: string }[];
  /** Total available, so the dropdown can say what "view all" covers. */
  total: number;
};

/**
 * Desktop navigation. Each top-level item links to its hub page — the full
 * list of every location, treatment, provider or symptom — and opens a
 * dropdown previewing the most useful entries.
 *
 * The top-level label is a real link, not just a toggle, so the hub pages are
 * reachable and crawlable. The chevron beside it is the toggle.
 */
export default function NavMenu({ sections }: { sections: NavSection[] }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openLabel) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenLabel(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openLabel]);

  return (
    <nav ref={navRef} className="flex items-center gap-[18px] xl:gap-[26px]">
      {sections.map((section) => {
        const open = openLabel === section.label;
        const panelId = `nav-${section.label.toLowerCase()}`;

        return (
          <div
            key={section.label}
            className="relative"
            onMouseEnter={() => setOpenLabel(section.label)}
            onMouseLeave={() => setOpenLabel(null)}
          >
            <span className="flex items-center gap-[6px]">
              <Link
                href={section.href}
                className="whitespace-nowrap text-[17px] leading-[1.16] tracking-[-0.4px] text-navy transition-opacity hover:opacity-70 xl:text-[20px]"
              >
                {section.label}
              </Link>
              <button
                type="button"
                aria-label={`${section.label} menu`}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenLabel(open ? null : section.label)}
                className="cursor-pointer p-[2px]"
              >
                <img
                  src="/images/icon-chevron-down.svg"
                  alt=""
                  className={`h-[8px] w-[14px] transition-transform duration-200 ease-out motion-reduce:transition-none ${
                    open ? "rotate-[180deg]" : "rotate-[0deg]"
                  }`}
                />
              </button>
            </span>

            <div
              id={panelId}
              hidden={!open}
              className="absolute top-full left-0 z-40 pt-[10px]"
            >
              <div className="w-[300px] rounded-[16px] bg-white p-[18px] shadow-[0_8px_30px_rgba(35,27,112,0.14)]">
                <ul className="flex flex-col gap-[2px]">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpenLabel(null)}
                        className="block truncate rounded-lg px-[10px] py-[7px] text-[15px] tracking-[-0.3px] text-navy transition-colors hover:bg-primary-light"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={section.href}
                  onClick={() => setOpenLabel(null)}
                  className="mt-[10px] block border-t border-navy/10 px-[10px] pt-[12px] text-[15px] font-bold tracking-[-0.3px] text-primary hover:underline"
                >
                  View all {section.total.toLocaleString("en-GB")}{" "}
                  {section.label.toLowerCase()} &rsaquo;
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
