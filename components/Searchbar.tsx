import { Dispatch, SetStateAction, SyntheticEvent, ChangeEvent } from "react";
import Button from "@/components/Button";
import { Search } from "react-feather";
import { useRouter } from "next/navigation";

interface SearchbarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function SearchPage({ query, setQuery }: SearchbarProps) {
  const router = useRouter();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a course, university, department..."
            className="w-full h-11 pl-10 pr-4 text-gray-900 placeholder-gray-400
                    rounded-md border border-gray-300 transition-colors
                    focus:outline-none focus:border-[#6155F5] focus:ring-2 focus:ring-[#6155F5]"
          />
        </div>

        <Button className="h-11 px-6 py-0 text-sm hidden md:inline-flex">
          Search
        </Button>
      </div>
    </form>
  );
}
