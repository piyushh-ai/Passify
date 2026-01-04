import React from "react";
import { KeyRound, LinkIcon } from "lucide-react";
import insta from "../assets/instagram.png";
import linkedIN from "../assets/linkedin.png";
import youtube from "../assets/youtube.png";

const Footer = () => {
  return (
    <div className="relative lg:h-30 h-45 mt-15 w-full bg-white shadow-[0_-20px_40px_-10px_rgba(59,130,246,0.35)]   ">
      <div className="absolute bottom-0 lg:px-50 py-8 w-full lg:flex items-center justify-between ">
        <div className=" flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Passify</h1>
            <KeyRound size={20} className="text-blue-600" strokeWidth={2} />
          </div>
        </div>
        <div className="p-2 text-lg font-medium text-center">
          <h1>
            Made by{" "}
            <span className="hover:underline hover:text-blue-500">
              <a
                href="https://www.instagram.com/piyush_sirolia?igsh=MWRxdTFvbTNnOXVwag=="
                target="_blank"
              >
                Piyush Sirolia
              </a>
            </span>
          </h1>
        </div>
        <div className="lg:flex gap-2">
          <h1 className="text-lg font-medium text-center ">Follow us:</h1>
          <div className="flex items-center justify-center mt-2 lg:my-0 gap-2">
            <a
              href="https://www.instagram.com/piyush_sirolia?igsh=MWRxdTFvbTNnOXVwag=="
              target="_blank"
            >
              <img className="w-5" src={insta} alt="" />
            </a>
            <a
              href="www.linkedin.com/in/piyush-sirolia-070174369"
              target="_blank"
            >
              <img className="w-5" src={linkedIN} alt="" />
            </a>
            <a href="https://www.youtube.com/@KaarigarCode" target="_blank">
              <img className="w-6" src={youtube} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
