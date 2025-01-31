import SearchBar from "../SearchBar";
import Hero from "./Hero";
import Sidebar from "./Sidebar";

function page() {
  return (
    <div className="px-2">
      <section className="py-2">
        {/* <SearchBar /> */}
        <Hero />
      </section>
    </div>
  );
}

export default page;
