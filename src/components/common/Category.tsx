import React from "react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
import classNames from "../../utils/className";

const categories = [
  "Thời sự",
  "Góc nhìn",
  "Thế giới",
  "Kinh doanh",
  "Bất động sản",
  "Khoa học",
  "Thể thao",
  "Giải trí",
  "Pháp luật",
];
export const Category = () => {
  return (
    <div className="flex items-center gap-5">
      {categories.map((item) => (
        <NavLink
          key={item}
          to={`/${slugify(item)}`}
          className={({ isActive }) =>
            classNames(
              "block font-medium text-lg hover:text-primary hover:underline hover:decoration-primary duration-300 transition-all",
              isActive ? "text-primary" : ""
            )
          }
        >
          {item}
        </NavLink>
      ))}
    </div>
  );
};
