import Image from "next/image";
import search from "@/public/search-svgrepo-com.svg";
import filter from "@/public/filter.svg";
import darkMode from "@/public/dark-mode-svgrepo-com.svg";
import bell from "@/public/bell-svgrepo-com.svg";
import profile from "@/public/ProfilePicture.svg";

const SearchBar = () => {
  return (
    <div>
      <label htmlFor="search">{}</label>
      <section className=" flex justify-between  h-[100%] ">
        <section>
          <section className="border max-w-[600px] flex justify-between px-4 rounded-full bg-[#ececec]">
            <input
              type="text"
              name=""
              id="search"
              placeholder="search any book..."
              className="bg-[#ececec] min-w-[450px] "
            />
            <section className="flex gap-6">
              <Image src={search} alt="search" width={30} height={30} />
              <Image src={filter} alt="search" width={30} height={30} />
            </section>
          </section>
        </section>
        <section>
          <section className="flex gap-2">
            <Image src={bell} alt="" width={30} height={30} />
            <Image src={darkMode} alt="" width={30} height={30} />
            <Image src={profile} alt="" width={30} height={30} />
          </section>
        </section>
      </section>
    </div>
  );
};

export default SearchBar;
