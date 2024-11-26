"use client";

import Link from "next/link";
import { Button } from "./Button";

const NavBar = () => {
  return (
    <nav className=" bg-gradient-to-br from-[#000510] via-[#002030] to-[#001525] text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <div className="flex">
          <span className="text-[#0095FF] font-bold text-xl">
            <Link href="/landing">Token eployer</Link>
          </span>
        </div>

        {/* <div className="flex">
          <Link href={"airdrop"}>
            <Button className="bg-blue-500 text-white px-8 py-2 rounded transition-all duration-300 hover:bg-blue-600">
              Connect Wallet
            </Button>
          </Link> 
        </div>*/}
      </div>
    </nav>
  );
};

export default NavBar;
