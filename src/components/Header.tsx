"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Restorative",
  "Orthodontics",
];

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3">
      <img src="/images/logo-mark.svg" alt="" width={27} height={24} />
      <img
        src="/images/logo-wordmark.svg"
        alt="Compare Cosmetic Dentist"
        width={122}
        height={28}
      />
    </Link>
  );
}

function Flag() {
  return (
    <img
      src="/images/flag-uk.svg"
      alt="United Kingdom"
      width={32}
      height={32}
      className="size-[32px] shrink-0 rounded-full"
    />
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white py-5 md:py-6">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        {/* Desktop: logo left · nav centered · flag right */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="justify-self-start">
            <Logo />
          </div>

          <nav className="flex items-center gap-[20px] justify-self-center xl:gap-[30px]">
            {NAV_LINKS.map((label) => (
              <Link
                key={label}
                href="#"
                className="whitespace-nowrap text-[18px] leading-[1.16] tracking-[-0.48px] text-navy transition-opacity hover:opacity-70 xl:text-[24px]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="justify-self-end">
            <Flag />
          </div>
        </div>

        {/* Mobile / tablet: logo left · hamburger right */}
        <div className="flex items-center justify-between lg:hidden">
          <Logo />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px]"
          >
            <span className="h-[3px] w-[25px] rounded-full bg-navy" />
            <span className="h-[3px] w-[25px] rounded-full bg-navy" />
            <span className="h-[3px] w-[25px] rounded-full bg-navy" />
          </button>
        </div>

        {open && (
          <nav className="mt-5 flex flex-col gap-4 lg:hidden">
            {NAV_LINKS.map((label) => (
              <Link
                key={label}
                href="#"
                className="text-[18px] tracking-[-0.36px] text-navy"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <span className="mt-1 flex items-center gap-2">
              <Flag />
            </span>
          </nav>
        )}
      </div>
    </header>
  );
}
