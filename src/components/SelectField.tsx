"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A search field whose chevron reverses only while its dropdown is actually
 * open, and returns to its original state the moment the dropdown closes.
 *
 * A native <select> fires no open/close events, and CSS `:focus` is not a
 * usable proxy — a select stays focused after you pick an option, which left
 * the arrow stuck upside down. `select:open` would be exact but is too new to
 * depend on. So the open state is tracked explicitly from the events that do
 * fire:
 *
 *   mousedown  toggles, so clicking the closed field opens it and clicking
 *              the open field closes it
 *   change     the user picked something, so it has closed
 *   blur       focus left the field
 *   Escape     dismissed from the keyboard
 *   Enter / Space / arrows open it from the keyboard
 *   pointerdown elsewhere on the page dismissed it while keeping focus,
 *              which none of the above would catch
 *
 * The whole pill is the <label>, so clicking the icon, the blank space or the
 * chevron opens the dropdown, not just the text.
 */
export default function SelectField({
  name,
  label,
  icon,
  iconClass,
  chevron,
  options,
  defaultValue,
  compact,
  className = "",
}: {
  name: string;
  label: string;
  icon: string;
  iconClass: string;
  chevron: string;
  options: string[];
  defaultValue: string;
  compact: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (!open) return;

    // Dismissing the dropdown by clicking elsewhere can leave the select
    // focused, so nothing else would tell us it closed.
    const onPointerDown = (event: PointerEvent) => {
      if (!labelRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onWindowBlur = () => setOpen(false);

    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("blur", onWindowBlur);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [open]);

  const optionClass = compact ? "bg-white text-black" : "bg-white text-navy";

  return (
    <label
      ref={labelRef}
      className={`relative flex cursor-pointer items-center gap-3 rounded-xl bg-white pr-[18px] pl-[15px] ${
        compact ? "h-[43px]" : "h-[53px]"
      } ${className}`}
    >
      <img
        src={icon}
        alt=""
        className={`${iconClass} pointer-events-none shrink-0`}
      />
      <select
        name={name}
        aria-label={label}
        defaultValue={defaultValue}
        onMouseDown={() => setOpen((v) => !v)}
        onChange={() => setOpen(false)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
            setOpen(true);
          } else if (event.key === "Escape" || event.key === "Tab") {
            setOpen(false);
          }
        }}
        className={`w-full min-w-0 cursor-pointer appearance-none bg-transparent text-[16px] tracking-[-0.36px] outline-none sm:text-[18px] ${
          compact ? "text-black" : "text-navy"
        }`}
      >
        <option value="" className={optionClass}>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className={optionClass}>
            {option}
          </option>
        ))}
      </select>
      <img
        src={chevron}
        alt=""
        data-open={open}
        className={`pointer-events-none h-[8px] w-[14px] shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none ${
          open ? "rotate-[180deg]" : "rotate-[0deg]"
        }`}
      />
    </label>
  );
}
