import React from "react";
import { KeyRound } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full shadow-2xl shadow-blue-500/50 p-3 bg-white">
      <div className="h-16 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Passify</h1>
          <KeyRound size={30} className="text-blue-500" strokeWidth={1.6} />
        </div>
        <p className="text-md text-gray-500 mt-0.5">
          A simple & secure password manager
        </p>
      </div>
    </header>
  );
};

export default Navbar;
