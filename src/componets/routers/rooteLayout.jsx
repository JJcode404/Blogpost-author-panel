import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar";
import { Footer } from "../footer.";

const RootLayout = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export { RootLayout };
