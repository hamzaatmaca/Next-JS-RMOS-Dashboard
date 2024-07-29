import { ReactNode } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import logo from "../../public/logo.png";
import { NavLink } from "@mantine/core";
import { navTitles } from "@/utils/staticHeaders";
import { IconGauge } from "@tabler/icons-react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: "200px",
          padding: "1rem",
          background: "#4fb1f1",
          minHeight: "100vh",
          position: "sticky",
        }}
      >
        <Image src={logo} alt="Açıklama" width={150} height={70} />

        <nav>
          {navTitles.map((val, key) => {
            return (
              <>
                <NavLink
                  style={{
                    borderRadius: "5px",
                  }}
                  mt={20}
                  key={key}
                  color="blue"
                  c="white"
                  variant="filled"
                  active
                  label={val}
                  leftSection={<IconGauge key={key} size="1rem" stroke={1.5} />}
                />
              </>
            );
          })}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "1rem" }}>
        <Navbar />
        {children} <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
