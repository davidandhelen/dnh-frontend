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
    label: "Wedding",
    path: "/wedding"
  },
  {
    label: "Photos",
    path: "/photos"
  },
  {
    label: "RSVP",
    path: "/rsvp"
  },
  {
    label: "FAQ",
    path: "/faq"
  }
];

const MainNav = () => {
  return (
    <header>
      <nav aria-label="Main" className={css.nav}>
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
    </header>
  );
};

export default MainNav;
