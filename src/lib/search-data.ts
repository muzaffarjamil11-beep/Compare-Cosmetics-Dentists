/**
 * Placeholder data for the search results page.
 *
 * Everything below is dummy content standing in for the real API. When the
 * endpoints are available, replace the exported consts with fetches — the
 * component tree only depends on the exported types, so nothing else in
 * `src/components/search` needs to change.
 *
 *   export async function getPractices(query: SearchQuery): Promise<Practice[]>
 *   export async function getFaqs(): Promise<Faq[]>
 */

export type PracticeSpec = {
  label: string;
  value: string;
  /** Rendered smaller and inline before the value, e.g. "from £1,850". */
  prefix?: string;
};

export type Practice = {
  rank: number;
  name: string;
  address: string;
  rating: string;
  reviews: string;
  featured: boolean;
  phone?: string;
  website?: string;
  /** Featured cards only. */
  specs?: PracticeSpec[];
  logo?:
    | { type: "icon"; bg: string; src: string }
    | { type: "photo"; src: string; bg?: string };
};

const FEATURED_SPECS: PracticeSpec[] = [
  { label: "Consultation", value: "£25" },
  { label: "Finance options", value: "Yes" },
  { label: "Exam Required", value: "No" },
  { label: "Treatment Price", value: "£1,850", prefix: "from " },
];

export const PRACTICES: Practice[] = [
  {
    rank: 1,
    name: "Yorkshire Dental\nSuite Leeds",
    address: "347 Oakwood Ln, Leeds LS8 3HA",
    rating: "4.9",
    reviews: "(3,293)",
    featured: true,
    phone: "0113 496 0089",
    specs: FEATURED_SPECS,
    logo: {
      type: "icon",
      bg: "bg-terracotta",
      src: "/images/clinic-logo-yorkshire.svg",
    },
  },
  {
    rank: 2,
    name: "Bupa Dental\nCare Leeds",
    address: "The Bridge, Waterloo St, Leeds LS10 1AP",
    rating: "4.8",
    reviews: "(2,140)",
    featured: true,
    phone: "0113 496 0090",
    specs: [
      { label: "Consultation", value: "Free" },
      { label: "Finance options", value: "Yes" },
      { label: "Exam Required", value: "Yes" },
      { label: "Treatment Price", value: "£2,200", prefix: "from " },
    ],
    logo: { type: "photo", src: "/images/photo-bupa.png" },
  },
  {
    rank: 3,
    name: "Ark Dentistry\nHuddersfield",
    address: "16 Acre St, Lindley, Huddersfield HD3 3DU",
    rating: "4.9",
    reviews: "(1,876)",
    featured: true,
    phone: "01484 651 111",
    specs: [
      { label: "Consultation", value: "£30" },
      { label: "Finance options", value: "Yes" },
      { label: "Exam Required", value: "No" },
      { label: "Treatment Price", value: "£1,650", prefix: "from " },
    ],
    logo: { type: "photo", src: "/images/photo-ark.png", bg: "bg-[#f2efea]" },
  },
  {
    rank: 4,
    name: "Oakwood Smile\nStudio",
    address: "12 Roundhay Rd, Leeds LS8 5AQ",
    rating: "4.7",
    reviews: "(1,204)",
    featured: false,
  },
  {
    rank: 5,
    name: "Headingley Dental\nPractice",
    address: "88 Otley Rd, Leeds LS6 4BA",
    rating: "4.7",
    reviews: "(986)",
    featured: false,
  },
  {
    rank: 6,
    name: "The Chapel\nDental Clinic",
    address: "5 Town St, Chapel Allerton, Leeds LS7 3HD",
    rating: "4.6",
    reviews: "(844)",
    featured: false,
  },
  {
    rank: 7,
    name: "Horsforth Cosmetic\nDentistry",
    address: "31 New Rd Side, Horsforth, Leeds LS18 4QD",
    rating: "4.6",
    reviews: "(712)",
    featured: false,
  },
  {
    rank: 8,
    name: "Wetherby Orthodontic\nCentre",
    address: "4 Bank St, Wetherby LS22 6NQ",
    rating: "4.5",
    reviews: "(603)",
    featured: false,
  },
  {
    rank: 9,
    name: "Pudsey Dental\n& Implant Centre",
    address: "22 Church Ln, Pudsey LS28 7LD",
    rating: "4.5",
    reviews: "(571)",
    featured: false,
  },
];

export const TREATMENT_TYPES = [
  "Clear Aligners",
  "Porcelain Veneers",
  "Dental Hygienist",
  "Composite Bonding",
  "Dental Implants",
  "Teeth Whitening",
  "Root Canal Treatment",
];

export const TREATMENTS = [
  "Clear Aligners",
  "Porcelain Veneers",
  "Dental Hygienist",
  "Composite Bonding",
  "Dental Implants",
  "Teeth Whitening",
];

export const LOCATIONS = ["Leeds", "Huddersfield", "Manchester", "London"];

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "How much does a dental implant cost in the UK?",
    answer:
      "A single implant typically runs from £1,800 to £2,500 privately, depending on the practice, the implant system and whether a bone graft is needed. Multiple implants or full-arch work cost more, and most practices spread payment over 12 to 60 months. Implants are only available on the NHS in limited clinical circumstances.",
  },
  {
    question: "Are clear aligners as effective as fixed braces?",
    answer:
      "For mild to moderate crowding, spacing or mild bite issues, clear aligners achieve results comparable to fixed braces. Complex bite corrections and significant rotations are still usually treated more predictably with fixed appliances. Aligners depend on being worn 20 to 22 hours a day, so results rely heavily on how consistently you wear them.",
  },
  {
    question: "How often should I see a dental hygienist?",
    answer:
      "Most people benefit from a hygienist visit every six months. If you have gum disease, smoke, or wear fixed braces, your clinician may recommend every three to four months. Regular cleaning removes the hardened plaque a toothbrush cannot reach, which is the main preventable cause of gum disease and tooth loss.",
  },
  {
    question: "Does dental insurance cover cosmetic treatment?",
    answer:
      "Usually not. Most UK dental plans cover check-ups, hygiene visits and clinically necessary restorative work, but exclude purely cosmetic treatment such as whitening or veneers placed for appearance alone. Always check whether your policy has a waiting period and an annual limit before booking.",
  },
  {
    question: "How do I know a dentist is properly registered?",
    answer:
      "Every dentist working in the UK must be registered with the General Dental Council, and you can search the GDC register free of charge by name or registration number. Practices should also be registered with the Care Quality Commission in England, and display their latest inspection rating.",
  },
];

export const SECTION_TAGS = [
  "Emergency",
  "Bupa",
  "Mydentist",
  "London Dentist",
  "Dental implant surgery",
  "Dental Deals",
];

export const POPULAR_LOCATIONS = [
  "Dentists in Leeds",
  "Dentists in Manchester",
  "Dentists in Birmingham",
  "Dentists in Sheffield",
  "Dentists in Bradford",
  "Dentists in Liverpool",
  "Dentists in Bristol",
  "Dentists in London",
  "Dentists in Glasgow",
  "Dentists in Edinburgh",
  "Dentists in Cardiff",
  "Dentists in Newcastle",
  "Dentists in Nottingham",
  "Dentists in Huddersfield",
  "Dentists in York",
  "Dentists in Wakefield",
  "Dentists in Harrogate",
  "Dentists in Halifax",
  "Dentists in Doncaster",
  "Dentists in Hull",
  "Dentists in Preston",
  "Dentists in Chester",
  "Dentists in Derby",
  "Dentists in Coventry",
  "Dentists in Reading",
  "Dentists in Southampton",
  "Dentists in Brighton",
];

export const POPULAR_SEARCHES = [
  "Clear aligners near me",
  "Composite bonding cost",
  "Porcelain veneers Leeds",
  "Teeth whitening prices",
  "Dental implants finance",
  "Emergency dentist today",
  "Invisible braces cost",
  "Same day crowns",
  "Root canal specialist",
  "Private hygienist near me",
  "Smile makeover cost",
  "Gum contouring",
  "Wisdom tooth removal",
  "Child friendly dentist",
  "Sedation dentistry",
  "Denture clinics",
  "Cosmetic dentist reviews",
  "0% finance dentistry",
  "Weekend dental clinic",
  "Tooth gap treatment",
  "Full arch implants",
  "Airflow teeth cleaning",
  "Fixed retainer cost",
  "Chipped tooth repair",
  "Dental bridge prices",
  "Veneers before and after",
  "Teeth straightening finance",
];
