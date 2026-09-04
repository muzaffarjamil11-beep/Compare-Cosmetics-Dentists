import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

/**
 * Shared layout for the four navigation hubs.
 *
 * These pages exist to expose every sub-page to a crawler, so they are set to
 * `noindex, follow`: Google is asked not to index the hub itself (it is a bare
 * list and would be a thin page), but to follow every link on it so the pages
 * that do have substance get discovered. That is also why the full list is
 * rendered in the markup rather than paginated or lazy-loaded.
 */
export const HUB_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};

export type HubEntry = { label: string; href: string; meta?: string };

export default function HubPage({
  title,
  intro,
  entries,
  columns = 4,
}: {
  title: string;
  intro: string;
  entries: HubEntry[];
  columns?: 3 | 4;
}) {
  const gridCols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <>
      <Header />

      <main className="flex-1 bg-surface pb-16">
        <div className="px-4 md:px-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <nav aria-label="Breadcrumb" className="pt-[18px]">
              <ol className="flex items-center gap-[6px] text-[13px] tracking-[-0.26px] text-navy/70">
                <li className="flex items-center gap-[6px]">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <span aria-hidden="true">&rsaquo;</span>
                </li>
                <li aria-current="page">{title}</li>
              </ol>
            </nav>

            <h1 className="mt-[14px] text-[28px] font-bold tracking-[-0.6px] text-navy sm:text-[36px]">
              {title}
            </h1>
            <p className="mt-[10px] max-w-[760px] text-[15px] leading-[1.5] text-navy/75 sm:text-[17px]">
              {intro}
            </p>
            <p className="mt-[6px] text-[14px] text-navy/55">
              {entries.length.toLocaleString("en-GB")} in total
            </p>

            <ul
              className={`mt-[26px] grid grid-cols-1 gap-x-8 gap-y-[10px] ${gridCols}`}
            >
              {entries.map((entry) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className="text-[15px] leading-[1.5] tracking-[-0.3px] text-primary transition-opacity hover:underline hover:opacity-75 sm:text-[16px]"
                  >
                    {entry.label}
                  </Link>
                  {entry.meta && (
                    <span className="ml-1 text-[13px] text-navy/45">
                      {entry.meta}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
