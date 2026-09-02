/**
 * Site-owned content for the search experience.
 *
 * Clinic records, locations and popular-link lists now come from the CQC
 * register via src/lib/clinics.ts. What remains here is content the CQC
 * export does not provide: the site's own treatment taxonomy, the FAQ copy
 * and the browse-by tags.
 */

export const TREATMENTS = [
  "Clear Aligners",
  "Porcelain Veneers",
  "Dental Hygienist",
  "Composite Bonding",
  "Dental Implants",
  "Teeth Whitening",
];


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

