import Sidebar from "./Sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" p-4 w-[100vw]">
      <section className="w-[100vw] flex justify-center">
        <Sidebar />
      </section>
      <div className="w-[100%]">
        <section></section>
        <section>{children}</section>
      </div>
      <section className=""></section>
    </section>
  );
}
