import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
import { useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const query = searchParams.get("q");

  const location = useLocation();
  const pathname = location.pathname;

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm) return;

    if (pathname === "/explore") {
      navigate(`/explore/search?q=${encodeURIComponent(searchTerm)}`);
    } else if (pathname === "/explore/search") {
      navigate(`/explore/search?q=${encodeURIComponent(searchTerm)}`, {
        replace: true,
      });
    }
  };

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
  }, []);

  return (
    <form
      className="flex items-center justify-center gap-2"
      onSubmit={handleSearch}
    >
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
        </Button>
      )}
      <Input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-full h-10 px-5 bg-secondary/20"
      />
      <Button variant="secondary" size="icon" className="rounded-full">
        <IoSearch />
      </Button>
    </form>
  );
};

export default SearchBar;
