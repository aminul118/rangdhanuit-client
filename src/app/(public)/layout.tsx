import Navbar from "@/components/layouts/Navbar/Navbar";
import Footer from "@/components/layouts/Footer/Footer";
import { Children } from "@/types";

const PublicLayout = ({ children }: Children) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
