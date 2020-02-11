// @flow
import React from "react";
import { Link } from "react-router-dom";

import { SubTitle } from "./kit/typography";

import css from "./MainNav.module.scss";

const LINKS = [
  {
    label: "Home",
    path: "/home"
  },
  {
    label: "Wedding",
    path: "/wedding"
  },
  {
    label: "Photos",
    path: "/home"
  },
  {
    label: "RSVP",
    path: "/home"
  },
  {
    label: "FAQ",
    path: "/home"
  }
];

const MainNav = () => {
  return (
    <nav className={css.nav}>
      <ul className={css.wrapper}>
        {LINKS.map((link, idx) => (
          <li className={css.linkWrapper} key={idx}>
            <Link className={css.link} to={link.path}>
              <SubTitle>{link.label}</SubTitle>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
