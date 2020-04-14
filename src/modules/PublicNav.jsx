// @flow
import React from "react";
import { Link } from "react-router-dom";

import { SubTitle } from "../kit/typography";

import css from "./MainNav.module.scss";

const LINKS = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "Photos",
    path: "/photos"
  },
  {
    label: "Log in",
    path: "/login"
  }
];

const PublicNav = () => {
  return (
    <nav className={css.nav}>
      <ul className={css.wrapper}>
        {LINKS.map((link, index) => (
          <li className={css.linkWrapper} key={`${index}_${link.label}`}>
            <Link className={css.link} to={link.path}>
              <SubTitle className={css.text}>{link.label}</SubTitle>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PublicNav;
