/**
 * Site-owned taxonomies for the navigation hubs.
 *
 * Locations and providers come from the CQC register (src/lib/clinics.ts).
 * Treatments and symptoms are not in any regulatory dataset, so they are
 * defined here.
 *
 * The treatment list follows the seed keywords in plan §2.6. That section
 * says the full list is for your sign-off before treatment detection starts,
 * so treat this as the working draft rather than the final taxonomy — it is
 * also the list the crawler will classify against, so changing it later means
 * re-running classification.
 */

export const TREATMENTS = [
  "Dental Implants",
  "Clear Aligners",
  "Invisalign",
  "Porcelain Veneers",
  "Composite Bonding",
  "Teeth Whitening",
  "Dental Hygienist",
  "Root Canal Treatment",
  "Crowns",
  "Bridges",
  "Dentures",
  "Wisdom Tooth Removal",
  "Gum Disease Treatment",
  "Emergency Dentist",
  "NHS Dentist",
  "Children's Dentistry",
  "Sedation Dentistry",
  "Smile Makeover",
];

/**
 * Symptom pages capture "why am I searching" intent rather than treatment
 * names, which is usually where the query volume sits.
 *
 * Each carries a short description and the treatments it usually leads to, so
 * a symptom page has something to say rather than being a bare heading — plan
 * §3.2 is explicit that near-empty pages should not be published.
 *
 * This copy is general information, not clinical advice, and the pages say so.
 */
export type Symptom = {
  name: string;
  description: string;
  treatments: string[];
  urgent?: boolean;
};

export const SYMPTOMS: Symptom[] = [
  {
    name: "Toothache",
    description:
      "Persistent tooth pain usually means decay has reached the inner part of the tooth, though it can also come from a cracked filling or gum infection. Pain that keeps you awake or comes with swelling needs same-day attention.",
    treatments: ["Emergency Dentist", "Root Canal Treatment", "Crowns"],
    urgent: true,
  },
  {
    name: "Sensitive teeth",
    description:
      "Sharp pain with hot, cold or sweet food often means worn enamel or exposed dentine near the gum line. It is common after whitening and usually settles, but ongoing sensitivity is worth investigating.",
    treatments: ["Dental Hygienist", "Composite Bonding", "Crowns"],
  },
  {
    name: "Bleeding gums",
    description:
      "Gums that bleed when you brush are the earliest sign of gum disease, caused by plaque hardening below the gum line. Caught early it is reversible with professional cleaning.",
    treatments: ["Dental Hygienist", "Gum Disease Treatment"],
  },
  {
    name: "Swollen gums",
    description:
      "Localised swelling often points to infection around a tooth or under a crown. Widespread puffiness is more typically gingivitis. Swelling with fever or facial puffiness is urgent.",
    treatments: ["Emergency Dentist", "Gum Disease Treatment"],
    urgent: true,
  },
  {
    name: "Receding gums",
    description:
      "Gums pulling back from the tooth expose the root, which looks longer and feels more sensitive. Causes include gum disease, heavy brushing and grinding. Recession does not grow back, so slowing it matters.",
    treatments: ["Gum Disease Treatment", "Dental Hygienist"],
  },
  {
    name: "Bad breath",
    description:
      "Persistent bad breath most often comes from bacteria between the teeth and on the tongue, or from untreated gum disease. It can also follow dry mouth or an infected tooth.",
    treatments: ["Dental Hygienist", "Gum Disease Treatment"],
  },
  {
    name: "Chipped tooth",
    description:
      "Small chips to a front tooth are usually cosmetic and can be rebuilt in one appointment. Larger chips that expose the inner tooth are more urgent because the nerve is at risk.",
    treatments: ["Composite Bonding", "Porcelain Veneers", "Crowns"],
  },
  {
    name: "Cracked tooth",
    description:
      "A crack often hurts when biting down and releasing rather than constantly. Cracks spread, so early treatment usually saves the tooth where waiting can cost it.",
    treatments: ["Crowns", "Root Canal Treatment", "Emergency Dentist"],
    urgent: true,
  },
  {
    name: "Loose tooth",
    description:
      "In an adult, a loose tooth normally means the bone supporting it has been lost to gum disease, or it has been knocked. Either way it needs assessing quickly to try to keep it.",
    treatments: ["Gum Disease Treatment", "Emergency Dentist"],
    urgent: true,
  },
  {
    name: "Missing tooth",
    description:
      "A gap changes how you bite and lets neighbouring teeth drift. Replacement options differ mainly in cost, how long they last and whether nearby teeth need preparing.",
    treatments: ["Dental Implants", "Bridges", "Dentures"],
  },
  {
    name: "Crooked teeth",
    description:
      "Crowding and rotation can usually be corrected with aligners or braces. Mild cases may be treatable cosmetically, but moving teeth properly is more stable long term.",
    treatments: ["Clear Aligners", "Invisalign", "Porcelain Veneers"],
  },
  {
    name: "Gaps between teeth",
    description:
      "Spacing can be closed by moving the teeth together or by building them out. Which is appropriate depends on the size of the gap and the health of the teeth either side.",
    treatments: ["Clear Aligners", "Composite Bonding", "Porcelain Veneers"],
  },
  {
    name: "Stained teeth",
    description:
      "Surface staining from tea, coffee, red wine and smoking usually responds to cleaning and whitening. Deeper discolouration inside the tooth does not, and needs a different approach.",
    treatments: ["Teeth Whitening", "Dental Hygienist", "Porcelain Veneers"],
  },
  {
    name: "Jaw pain",
    description:
      "Aching around the jaw joint and temples is often related to clenching or grinding, and frequently worse in the morning. It can also follow an uneven bite.",
    treatments: ["Sedation Dentistry", "Smile Makeover"],
  },
  {
    name: "Clicking jaw",
    description:
      "A click or pop when opening is common and often harmless. It matters more when it comes with pain, or when the jaw locks or catches.",
    treatments: ["Smile Makeover"],
  },
  {
    name: "Teeth grinding",
    description:
      "Grinding, often during sleep, wears the biting surfaces flat and can crack teeth and fillings. A guard protects the teeth while the cause is addressed.",
    treatments: ["Crowns", "Composite Bonding"],
  },
  {
    name: "Mouth ulcers",
    description:
      "Most mouth ulcers heal within two weeks. One that does not heal in three weeks should always be checked, as should any lump or patch that will not go away.",
    treatments: ["Emergency Dentist"],
    urgent: true,
  },
  {
    name: "Dry mouth",
    description:
      "Reduced saliva is often a side effect of medication. Because saliva protects the teeth, a dry mouth raises the risk of decay and needs closer monitoring.",
    treatments: ["Dental Hygienist"],
  },
  {
    name: "Wisdom tooth pain",
    description:
      "Pain at the back of the jaw in late teens or twenties is usually a wisdom tooth pushing through, sometimes trapping food and gum. Not every wisdom tooth needs removing.",
    treatments: ["Wisdom Tooth Removal", "Emergency Dentist"],
  },
  {
    name: "Dental abscess",
    description:
      "A collection of infection causing throbbing pain, swelling and often a bad taste. This does not resolve on its own and needs treating promptly — seek same-day care if the swelling is spreading.",
    treatments: ["Emergency Dentist", "Root Canal Treatment"],
    urgent: true,
  },
];

/** URL-safe slug, used for the hub links. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
