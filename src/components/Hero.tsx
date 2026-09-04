import SearchForm from "./SearchForm";

function Rating() {
  return (
    <div className="flex shrink-0 items-center gap-1 md:gap-2">
      <span className="text-[13px] leading-[1.16] tracking-[-0.26px] text-navy">
        4.9
      </span>
      <img
        src="/images/stars-5.svg"
        alt="Rated 4.9 out of 5"
        width={68}
        height={12}
      />
      <img src="/images/feefo-logo.svg" alt="feefo" width={57} height={13} />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-4 pb-[30px] md:pt-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <div className="rounded-[20px] bg-teal-light px-4 pt-9 pb-[33px] md:pt-[78px] md:pb-[33px]">
          <div className="mx-auto flex w-full max-w-[835px] flex-col gap-[35px] md:gap-[86px]">
            <div className="flex flex-col items-center gap-8 md:gap-16">
              <div className="flex flex-col items-center gap-[30px] text-center text-navy">
                <h1 className="text-[40px] font-bold leading-[0.94] tracking-[-0.8px] md:text-[50px] md:tracking-[-1px]">
                  Smarter dental
                  <br className="md:hidden" /> choices,
                  <br />
                  made simple
                </h1>
                <p className="text-[18px] leading-[1.16] tracking-[-0.36px] md:text-[24px] md:tracking-[-0.48px]">
                  We are the independent consumer
                  <br />
                  hub for UK dentistry
                </p>
              </div>

              {/* Three controls need ~600px to sit side by side without
                  cramping the labels, so they stack until lg. */}
              <SearchForm variant="hero" />
            </div>

            {/* Figma groups these centrally with a 41px gap. Mobile keeps
                justify-between, because at 375px the pair only just fits and
                a fixed gap pushes the rating past the card edge. */}
            <div className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-3 md:justify-center md:gap-x-[41px]">
              <p className="whitespace-nowrap text-[16px] font-bold leading-[1.16] tracking-[-0.32px] text-navy">
                Advice you can trust
              </p>
              <Rating />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
