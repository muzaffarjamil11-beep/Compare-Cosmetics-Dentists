"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavMenu, { type NavSection } from "./NavMenu";

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

export default function HeaderShell({ sections }: { sections: NavSection[] }) {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

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
          <div className="hidden lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6">
            <div className="justify-self-start">
              <Logo />
            </div>
            <div className="justify-self-center">
              <NavMenu sections={sections} />
            </div>
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
        className={`fixed top-0 right-0 z-50 flex h-full w-[320px] max-w-[88vw] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between px-6 py-5">
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

        {/* Each section collapses, so the drawer stays navigable with four
            long lists behind it. */}
        <nav className="flex flex-col px-6 pb-6">
          {sections.map((section) => {
            const expanded = openSection === section.label;
            return (
              <div key={section.label} className="border-b border-navy/10">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={section.href}
                    onClick={() => setOpen(false)}
                    className="flex-1 py-3 text-[18px] font-bold tracking-[-0.36px] text-navy"
                  >
                    {section.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${section.label} submenu`}
                    aria-expanded={expanded}
                    onClick={() =>
                      setOpenSection(expanded ? null : section.label)
                    }
                    className="cursor-pointer p-2"
                  >
                    <img
                      src="/images/icon-chevron-down.svg"
                      alt=""
                      className={`h-[8px] w-[14px] transition-transform duration-200 ease-out motion-reduce:transition-none ${
                        expanded ? "rotate-[180deg]" : "rotate-[0deg]"
                      }`}
                    />
                  </button>
                </div>

                <div
                  inert={!expanded}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-col gap-[2px] pb-3">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block truncate rounded-lg px-3 py-2 text-[16px] tracking-[-0.32px] text-navy transition-colors hover:bg-primary-light"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={section.href}
                          onClick={() => setOpen(false)}
                          className="block px-3 py-2 text-[15px] font-bold text-primary"
                        >
                          View all {section.total.toLocaleString("en-GB")}{" "}
                          &rsaquo;
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto shrink-0 px-6 py-6">
          <Flag />
        </div>
      </div>
    </>
  );
}
