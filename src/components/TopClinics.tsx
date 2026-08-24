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
      className:
        "h-[45px] w-[47px] md:h-[34px] md:w-[36px] lg:h-[42px] lg:w-[45px] xl:h-[53px] xl:w-[56px]",
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

/* Three cards sit side by side from 768px, where each is only ~244px wide, so
   the type steps down for tablet and only reaches Figma's desktop sizes at
   1280px, where a card is wide enough (~384px) to carry them. */
const LOGO_BOX =
  "size-[64px] shrink-0 rounded-[10px] md:size-[48px] lg:size-[60px] xl:size-[75px] xl:rounded-[12px]";
const META_TEXT =
  "text-[13px] leading-[1.16] tracking-[-0.26px] text-navy md:text-[12px] lg:text-[13px] xl:text-[15px] xl:tracking-[-0.3px]";
/* Side by side everywhere except tablet, where a ~214px card leaves each
   button only ~85px — narrower than "Visit website" needs to breathe. */
const CARD_BUTTON =
  "h-[43px] flex-1 px-2 text-[16px] tracking-[-0.32px] md:h-[40px] md:w-full md:flex-none md:text-[14px] lg:h-[43px] lg:w-auto lg:flex-1 lg:text-[16px] xl:h-[51px] xl:rounded-[14px] xl:text-[18px] xl:tracking-[-0.36px]";

function ClinicLogo({ logo }: { logo: Clinic["logo"] }) {
  if (logo.type === "photo") {
    return (
      <img
        src={logo.src}
        alt=""
        width={75}
        height={75}
        className={`${LOGO_BOX} object-cover ${logo.bg ?? ""}`}
      />
    );
  }

  return (
    <div className={`${LOGO_BOX} ${logo.bg} flex items-center justify-center`}>
      <img src={logo.src} alt="" className={logo.className} />
    </div>
  );
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[20px] bg-white p-[15px] md:p-[18px] xl:rounded-[24px]">
      {/* Title + rating share a column so the rating sits directly under the
          title, with the logo alongside rather than pushing them down. */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-[15px] md:gap-[10px] xl:gap-[14px]">
          <h3 className="whitespace-pre-line text-[22px] font-bold leading-[0.94] tracking-[-0.44px] text-navy md:text-[17px] md:tracking-[-0.34px] lg:text-[20px] lg:tracking-[-0.4px] xl:text-[28px] xl:tracking-[-0.56px]">
            {clinic.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={META_TEXT}>{clinic.rating}</span>
            <img
              src="/images/rating-stars.svg"
              alt={`Rated ${clinic.rating} out of 5`}
              className="h-[12px] w-[68px] md:h-[10px] md:w-[56px] lg:h-[12px] lg:w-[68px] xl:h-[15px] xl:w-[80px]"
            />
            <span className={META_TEXT}>{clinic.reviews}</span>
          </div>
        </div>
        <ClinicLogo logo={clinic.logo} />
      </div>

      <div className="mt-[19px] mb-[23px] flex items-center gap-[10px] md:mt-[14px] md:mb-[16px] xl:mt-[23px] xl:mb-[26px]">
        <img
          src="/images/icon-pin-small.svg"
          alt=""
          className="h-[18px] w-[14px] shrink-0 md:h-[16px] md:w-[12px] xl:h-[22px] xl:w-[17px]"
        />
        <p className={META_TEXT}>{clinic.address}</p>
      </div>

      {/* mt-auto keeps the buttons bottom-aligned across all three cards
          even if one address wraps to a second line. */}
      <div className="mt-auto flex gap-[10px] md:flex-col md:gap-[8px] lg:flex-row lg:gap-[10px]">
        <Button variant="secondary" className={CARD_BUTTON}>
          Learn more
        </Button>
        <Button variant="primary" className={CARD_BUTTON}>
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
        <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:gap-4 xl:gap-6">
          {CLINICS.map((clinic) => (
            <div key={clinic.name} className="md:min-w-0 md:flex-1">
              <ClinicCard clinic={clinic} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
