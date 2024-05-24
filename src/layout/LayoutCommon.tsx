import React from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import { Category } from "../components/common/Category";

const LayoutCommon = () => {
  return (
    <div>
      <header className="border-b border-b-gray-300">
        <div className="container-wp py-5 flex items-center justify-between">
          <Logo />
          <Category />
        </div>
      </header>
      <div className="container-wp min-h-[calc(100vh-80px-64px)] pt-10 pb-20">
        <Outlet></Outlet>
      </div>
      <footer className="border-t border-t-gray-300">
        <div className="container-wp py-5 text-center">
          ©1997-2024. Toàn bộ bản quyền thuộc paper_news
        </div>
      </footer>
    </div>
  );
};

export default LayoutCommon;
