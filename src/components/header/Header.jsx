import React from "react";
import logo from "../../assets/image/logo-white.png";

export const Header = () => {

  return (
    <nav className="text-white bg-blue-900">
      <div className="flex flex-wrap items-center justify-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="w-full max-w-32" />
        </a>
      </div>
    </nav>
  );
};
