import Image from "next/image";
import Logo from "@/public/images.jpeg";
import SidebarElements from "./SidebarElements";
import Home from "@/public/home-smile-svgrepo-com.svg";
import BorrowedBooks from "@/public/BorrowedBooks.svg";
import compass from "@/public/Compass.svg";
import Fav from "@/public/Heart.svg";
import history from "@/public/history-svgrepo-com.svg";
import settings from "@/public/settings-svgrepo-com.svg";

import help from "@/public/help.svg";

function Sidebar() {
  return (
    <div className=" z-50 px-3 min-w-[900px] border-[#EDEDED]  rounded-[200px] bg-[#899878] flex  justify-between ">
      <section className="px-2 flex justify-between py-10 w-full ">
        <Image
          src={Logo}
          width={30}
          height={30}
          alt="logo"
          className="rounded-full"
        />
        <SidebarElements image={Home} text="Welcome" link="/Home" />
        <SidebarElements
          image={BorrowedBooks}
          text="Resources"
          link="/Home/Resources"
        />
        <SidebarElements image={compass} text="Library " link="/Home/Library" />
        <SidebarElements
          image={settings}
          text="Log Out"
          link="/Home/Settings"
        />
      </section>
    </div>
  );
}

export default Sidebar;
