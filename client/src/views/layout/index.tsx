import { Outlet } from "react-router-dom";
import Container from "./Container";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  return (
    <div className="overflow-x-hidden bg-gradient-to-t from-[#3a444d] to-[#0c0d0f] sm:bg-medium-gray">
      <Header />
      <div className="">
        <div className="">
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}
