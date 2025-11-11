import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import StickyServicesBar from "./StickyServicesBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <ScrollTopButton />
      <Footer />
      <StickyServicesBar />
    </div>
  );
};

export default Layout;
