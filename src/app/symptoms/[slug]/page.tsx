import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { SYMPTOMS, slugify } from "@/lib/taxonomy";

type Params = Promise<{ slug: string }>;

const find = (slug: string) => SYMPTOMS.find((s) => slugify(s.name) === slug);

export function generateStaticParams() {
  return SYMPTOMS.map((symptom) => ({ slug: slugify(symptom.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const symptom = find((await params).slug);
  if (!symptom) return {};
  return {
    title: `${symptom.name} — what it means and who treats it | Compare Cosmetic Dentist`,
    description: symptom.description,
  };
}

export default async function SymptomPage({ params }: { params: Params }) {
  const symptom = find((await params).slug);
  if (!symptom) notFound();

  return (
    <>
      <Header />

      <main className="flex-1 bg-surface pb-16">
        <div className="px-4 md:px-10">
          <div className="mx-auto w-full max-w-[900px]">
            <nav aria-label="Breadcrumb" className="pt-[18px]">
              <ol className="flex flex-wrap items-center gap-[6px] text-[13px] tracking-[-0.26px] text-navy/70">
                <li className="flex items-center gap-[6px]">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <span aria-hidden="true">&rsaquo;</span>
                </li>
                <li className="flex items-center gap-[6px]">
                  <Link href="/symptoms" className="hover:underline">
                    Symptoms
                  </Link>
                  <span aria-hidden="true">&rsaquo;</span>
                </li>
                <li aria-current="page">{symptom.name}</li>
              </ol>
            </nav>

            <h1 className="mt-[14px] text-[28px] font-bold tracking-[-0.6px] text-navy sm:text-[36px]">
              {symptom.name}
            </h1>

            {symptom.urgent && (
              <p className="mt-[14px] rounded-[12px] bg-[#fdecec] px-[15px] py-[12px] text-[15px] leading-[1.5] text-navy">
                <strong>See a dentist promptly.</strong> This symptom can
                worsen quickly. If you have spreading facial swelling,
                difficulty swallowing or a high temperature, seek urgent care
                or call 111.
              </p>
            )}

            <p className="mt-[16px] text-[16px] leading-[1.6] text-navy sm:text-[18px]">
              {symptom.description}
            </p>

            <h2 className="mt-[30px] text-[20px] font-bold tracking-[-0.44px] text-navy sm:text-[24px]">
              Commonly treated with
            </h2>
            <ul className="mt-[14px] flex flex-wrap gap-[8px]">
              {symptom.treatments.map((treatment) => (
                <li key={treatment}>
                  <Link
                    href={`/search?treatment=${encodeURIComponent(treatment)}`}
                    className="inline-flex items-center rounded-full border border-navy/25 px-[14px] py-[6px] text-[14px] tracking-[-0.28px] text-navy transition-colors hover:bg-primary-light"
                  >
                    {treatment}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-[30px] text-[20px] font-bold tracking-[-0.44px] text-navy sm:text-[24px]">
              Find a dentist near you
            </h2>
            <div className="mt-[14px] rounded-[20px] bg-teal-light p-[18px]">
              <SearchForm variant="bar" />
            </div>

            <p className="mt-[24px] text-[13px] leading-[1.5] text-navy/55">
              General information only, not clinical advice. Always speak to a
              dentist about your own symptoms. Practice details come from the
              Care Quality Commission register.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
