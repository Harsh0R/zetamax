import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Zetamax } from "../../assets/imgs";
 

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 px-6 py-4 shadow-md">
      <div className="flex items-center gap-3">
        <img src={Zetamax} alt="Zetamax" className="w-20 h-20" /> 
        {/* <h1 className="text-xl font-semibold text-white">Zetamax</h1> */}
      </div>

      <div>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
