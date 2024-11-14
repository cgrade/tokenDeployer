import "../styles/global.css";
import { ReactNode } from "react";
import NavBar from "@/components/ui/NavBar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
