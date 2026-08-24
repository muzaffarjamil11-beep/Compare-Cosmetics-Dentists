type Clinic = {
  name: string;
  rating: string;
  reviews: string;
  address: string;
  logo:
    | { type: "icon"; bg: string; src: string; width: number; height: number }
    | { type: "photo"; src: string };
};

const CLINICS: Clinic[] = [
  {
    name: "Yorkshire Dental\nSuite Leeds",
    rating: "4.9",
    reviews: "(3,293)",
    address: "347 Oakwood Ln, Leeds LS8 3HA",
    logo: {
      type: "icon",
      bg: "bg-terracotta",
      src: "/images/clinic-logo-yorkshire.svg",
      width: 47,
      height: 44,
    },
  },
  {
    name: "Bupa Dental\nCare Leeds",
    rating: "4.9",
    reviews: "(3,293)",
    address: "The Bridge, Waterloo St, Leeds LS10 1AP",
    logo: { type: "photo", src: "/images/photo-bupa.png" },
  },
  {
    name: "Ark Dentistry\nHuddersfield",
    rating: "4.9",
    reviews: "(3,293)",
    address: "16 Acre St, Lindley, Huddersfield HD3 3DU",
    logo: { type: "photo", src: "/images/photo-ark.png" },
  },
];

function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-[24px] bg-white p-[18px] md:flex-1">
      <div className="flex items-start justify-between gap-3">
        <h3 className="whitespace-pre-line text-[22px] font-bold leading-[0.94] tracking-[-0.44px] text-navy md:text-[28px] md:tracking-[-0.56px]">
          {clinic.name}
        </h3>
        {clinic.logo.type === "icon" ? (
          <div
            className={`flex size-[64px] shrink-0 items-center justify-center rounded-xl md:size-[75px] ${clinic.logo.bg}`}
          >
            <img
              src={clinic.logo.src}
              alt=""
              width={clinic.logo.width}
              height={clinic.logo.height}
            />
          </div>
        ) : (
          <img
            src={clinic.logo.src}
            alt=""
            width={64}
            height={64}
            className="size-[64px] shrink-0 rounded-xl object-cover md:size-[75px]"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[13px] tracking-[-0.26px] text-navy">
          {clinic.rating}
        </span>
        <img src="/images/rating-stars.svg" alt="" width={68} height={12} />
        <span className="text-[13px] tracking-[-0.26px] text-navy">
          {clinic.reviews}
        </span>
      </div>

      <div className="flex items-start gap-2">
        <img
          src="/images/icon-pin-small.svg"
          alt=""
          width={14}
          height={18}
          className="mt-0.5 shrink-0"
        />
        <p className="text-[13px] leading-[0.94] tracking-[-0.26px] text-navy">
          {clinic.address}
        </p>
      </div>

      <div className="mt-2 flex gap-2">
        <button
          type="button"
          className="h-[43px] flex-1 rounded-xl bg-primary-light text-[16px] font-bold tracking-[-0.32px] text-navy transition-opacity hover:opacity-80"
        >
          Learn more
        </button>
        <button
          type="button"
          className="h-[43px] flex-1 rounded-xl bg-primary text-[16px] font-bold tracking-[-0.32px] text-white transition-opacity hover:opacity-90"
        >
          Visit website
        </button>
      </div>
    </div>
  );
}

export default function TopClinics() {
  return (
    <section className="bg-surface px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-[1361px] flex-col items-center gap-8 md:gap-[34px]">
        <h2 className="text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:text-[42px] md:tracking-[-0.84px]">
          Top rated dental
          <br />
          clinics near you
        </h2>
        <div className="flex w-full flex-col gap-4 md:flex-row md:gap-6">
          {CLINICS.map((clinic) => (
            <ClinicCard key={clinic.name} clinic={clinic} />
          ))}
        </div>
      </div>
    </section>
  );
}
