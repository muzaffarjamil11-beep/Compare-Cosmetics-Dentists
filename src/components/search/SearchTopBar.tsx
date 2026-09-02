import SearchForm from "@/components/SearchForm";

export default function SearchTopBar({
  treatment = "",
  location = "",
}: {
  treatment?: string;
  location?: string;
}) {
  return (
    <div className="bg-teal-light py-[15px]">
      <div className="px-4 md:px-10">
        <div className="mx-auto max-w-[1146px]">
          <SearchForm
            variant="bar"
            defaultTreatment={treatment}
            defaultLocation={location}
          />
        </div>
      </div>
    </div>
  );
}
