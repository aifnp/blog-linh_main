import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to={"/"} className="font-secondary uppercase font-bold text-4xl">
      Paper_<span className="text-primary font-semibold">News</span>
    </Link>
  );
};
