import Navbar from "@/components/layouts/Navbar/Navbar";
import Footer from "@/components/layouts/Footer/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow pt-20">{children}</main>
      <Footer />
    </div>
  );
}
