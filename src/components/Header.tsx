"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "General Dentistry", href: "/search" },
  { label: "Cosmetic Dentistry", href: "#" },
  { label: "Restorative", href: "#" },
  { label: "Orthodontics", href: "#" },
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

const BAR = "block h-[3px] w-[25px] rounded-full bg-navy";

export default function Header() {
  const [open, setOpen] = useState(false);

  // While the drawer is open, close on Escape and stop the page behind it
  // from scrolling.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <header className="bg-white py-5 md:py-6">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
          {/* Desktop: logo left · nav centered · flag right */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="justify-self-start">
              <Logo />
            </div>

            <nav className="flex items-center gap-[20px] justify-self-center xl:gap-[30px]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap text-[18px] leading-[1.16] tracking-[-0.48px] text-navy transition-opacity hover:opacity-70 xl:text-[24px]"
                >
                  {link.label}
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
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen(true)}
              className="flex cursor-pointer flex-col gap-[5px]"
            >
              <span className={BAR} />
              <span className={BAR} />
              <span className={BAR} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop — also closes the drawer when tapped */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-navy/40 transition-opacity duration-300 ease-out lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer — slides in from the right */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed top-0 right-0 z-50 flex h-full w-[300px] max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="relative size-[25px] shrink-0 cursor-pointer"
          >
            <span
              className={`${BAR} absolute top-1/2 left-0 -translate-y-1/2 rotate-45`}
            />
            <span
              className={`${BAR} absolute top-1/2 left-0 -translate-y-1/2 -rotate-45`}
            />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg py-3 text-[18px] tracking-[-0.36px] text-navy transition-colors hover:bg-primary-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 py-6">
          <Flag />
        </div>
      </div>
    </>
  );
}
