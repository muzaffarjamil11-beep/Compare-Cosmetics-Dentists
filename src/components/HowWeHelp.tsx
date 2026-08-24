const ITEMS = [
  {
    icon: "/images/icon-help-1.svg",
    width: 24,
    height: 24,
    title: "Find top-rated clinics, fast",
    body: "Search the best-rated clinics near you and compare before you book.",
  },
  {
    icon: "/images/icon-help-2.svg",
    width: 20,
    height: 24,
    title: "Clear costs, trusted information",
    body: "See accurate treatment details and transparent pricing upfront.",
  },
  {
    icon: "/images/icon-help-3.svg",
    width: 20,
    height: 24,
    title: "Simple, no-cost booking",
    body: "Book appointments easily with no extra cost to you.",
  },
];

export default function HowWeHelp() {
  return (
    <section className="px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-[1361px] flex-col items-center gap-9 md:gap-[42px]">
        <h2 className="text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:text-[42px] md:tracking-[-0.84px]">
          How Compare Cosmetic
          <br />
          Dentist can help you
        </h2>
        <div className="flex flex-col items-center gap-9 md:flex-row md:items-start md:gap-10">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex w-full max-w-[354px] flex-col items-center gap-[27px] text-center"
            >
              <div className="flex size-[75px] items-center justify-center rounded-[10px] bg-teal-light">
                <img src={item.icon} alt="" width={item.width} height={item.height} />
              </div>
              <p className="text-[18px] leading-[1.16] tracking-[-0.36px] text-navy md:text-[24px]">
                <span className="font-bold">{item.title}</span>
                <br />
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
