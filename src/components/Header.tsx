"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Restorative",
  "Orthodontics",
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-white px-6 py-5 md:px-10 md:py-6">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo-mark.svg" alt="" width={27} height={24} />
          <img
            src="/images/logo-wordmark.svg"
            alt="Compare Cosmetic Dentist"
            width={122}
            height={28}
          />
        </Link>

        <nav className="hidden items-center gap-[30px] md:flex">
          {NAV_LINKS.map((label) => (
            <Link
              key={label}
              href="#"
              className="text-[18px] font-medium tracking-[-0.36px] text-navy transition-opacity hover:opacity-70"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[8px] md:hidden"
        >
          <span className="h-[3px] w-[25px] rounded-full bg-navy" />
          <span className="h-[3px] w-[25px] rounded-full bg-navy" />
          <span className="h-[3px] w-[25px] rounded-full bg-navy" />
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-5 flex max-w-[1360px] flex-col gap-4 md:hidden">
          {NAV_LINKS.map((label) => (
            <Link
              key={label}
              href="#"
              className="text-[18px] font-medium tracking-[-0.36px] text-navy"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
