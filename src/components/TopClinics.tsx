import Button from "./Button";

type Clinic = {
  name: string;
  rating: string;
  reviews: string;
  address: string;
  logo:
    | { type: "icon"; bg: string; src: string; className: string }
    | { type: "photo"; src: string; bg?: string };
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
      className: "h-[45px] w-[47px] md:h-[53px] md:w-[56px]",
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
    logo: { type: "photo", src: "/images/photo-ark.png", bg: "bg-[#f2efea]" },
  },
];

function ClinicLogo({ logo }: { logo: Clinic["logo"] }) {
  const box =
    "size-[64px] shrink-0 rounded-[10px] md:size-[75px] md:rounded-[12px]";

  if (logo.type === "photo") {
    return (
      <img
        src={logo.src}
        alt=""
        width={75}
        height={75}
        className={`${box} object-cover ${logo.bg ?? ""}`}
      />
    );
  }

  return (
    <div className={`${box} ${logo.bg} flex items-center justify-center`}>
      <img src={logo.src} alt="" className={logo.className} />
    </div>
  );
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[20px] bg-white p-[15px] md:rounded-[24px] md:p-[18px]">
      {/* Title + rating share a column so the rating sits directly under the
          title, with the logo alongside rather than pushing them down. */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-[15px] md:gap-[14px]">
          <h3 className="whitespace-pre-line text-[22px] font-bold leading-[0.94] tracking-[-0.44px] text-navy md:text-[28px] md:tracking-[-0.56px]">
            {clinic.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[13px] leading-[1.16] tracking-[-0.26px] text-navy md:text-[15px] md:tracking-[-0.3px]">
              {clinic.rating}
            </span>
            <img
              src="/images/rating-stars.svg"
              alt={`Rated ${clinic.rating} out of 5`}
              className="h-[12px] w-[68px] md:h-[15px] md:w-[80px]"
            />
            <span className="text-[13px] leading-[1.16] tracking-[-0.26px] text-navy md:text-[15px] md:tracking-[-0.3px]">
              {clinic.reviews}
            </span>
          </div>
        </div>
        <ClinicLogo logo={clinic.logo} />
      </div>

      <div className="mt-[19px] mb-[23px] flex items-center gap-[10px] md:mt-[23px] md:mb-[26px]">
        <img
          src="/images/icon-pin-small.svg"
          alt=""
          className="h-[18px] w-[14px] shrink-0 md:h-[22px] md:w-[17px]"
        />
        <p className="text-[13px] leading-[1.16] tracking-[-0.26px] text-navy md:text-[15px] md:tracking-[-0.3px]">
          {clinic.address}
        </p>
      </div>

      {/* mt-auto keeps the buttons bottom-aligned across all three cards
          even if one address wraps to a second line. */}
      <div className="mt-auto flex gap-[10px]">
        <Button
          variant="secondary"
          className="h-[43px] flex-1 text-[16px] tracking-[-0.32px] md:h-[51px] md:rounded-[14px] md:text-[18px] md:tracking-[-0.36px]"
        >
          Learn more
        </Button>
        <Button
          variant="primary"
          className="h-[43px] flex-1 text-[16px] tracking-[-0.32px] md:h-[51px] md:rounded-[14px] md:text-[18px] md:tracking-[-0.36px]"
        >
          Visit website
        </Button>
      </div>
    </div>
  );
}

export default function TopClinics() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-4 md:gap-[34px] md:px-10">
        <h2 className="text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:text-[42px] md:tracking-[-0.84px]">
          Top rated dental
          <br />
          clinics near you
        </h2>
        <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:gap-6">
          {CLINICS.map((clinic) => (
            <div key={clinic.name} className="md:flex-1">
              <ClinicCard clinic={clinic} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
