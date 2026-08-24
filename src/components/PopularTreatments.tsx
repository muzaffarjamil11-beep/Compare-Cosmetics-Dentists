const TREATMENTS = [
  "Clear Aligners",
  "Porcelain Veneers",
  "Dental Hygienist",
  "Composite Bonding",
  "Dental  Implants",
  "Teeth Whitening",
];

export default function PopularTreatments({ city = "Leeds" }: { city?: string }) {
  return (
    <section className="bg-primary-light px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-[1361px] flex-col items-center gap-9 md:gap-[42px]">
        <h2 className="text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:text-[42px] md:tracking-[-0.84px]">
          Popular treatments
          <br />
          in <span className="underline">{city}</span>
        </h2>

        <div className="w-full max-w-[806px] rounded-[20px] bg-white p-[17px] md:p-[30px]">
          {TREATMENTS.map((treatment, index) => (
            <a
              key={treatment}
              href="#"
              className={`flex items-center justify-between py-[21px] whitespace-pre-line text-[20px] font-bold tracking-[-0.4px] text-navy transition-opacity hover:opacity-70 md:py-[21px] md:text-[24px] ${
                index !== 0 ? "border-t border-navy/10" : ""
              }`}
            >
              {treatment}
              <img
                src="/images/icon-chevron-right.svg"
                alt=""
                width={8}
                height={14}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
