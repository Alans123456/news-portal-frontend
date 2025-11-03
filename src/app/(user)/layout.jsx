import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <main className="lg:col-span-2">{children}</main>
        <aside className="lg:col-span-1 hidden lg:block">
          <Sidebar />
        </aside>
      </div>
      <Footer />
    </>
  );
}
