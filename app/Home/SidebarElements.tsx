"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface sidebarProps {
  image: string;
  text: string;
  link: string;
}

function SidebarElements(props: sidebarProps) {
  const pathName = usePathname();
  // console.log(pathName);
  const isActive = (path: string): boolean => {
    return path === pathName;
  };

  return (
    <section>
      <Link href={`${props.link}`}>
        <div
          className={`flex gap-3 px-4 py-1 rounded-full cursor-default ${
            isActive(props.link)
              ? "text-white bg-[#222725] font-semibold"
              : "text-black font-semibold"
          } `}
        >
          <Image src={props.image} alt="" width={20} height={20} />
          <p className="">{props.text}</p>
        </div>
      </Link>
    </section>
  );
}

export default SidebarElements;
