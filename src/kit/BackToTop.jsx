// @flow
import React from "react";

import CTALink from "./CTALink";

import css from "./BackToTop.module.scss";

const BackToTop = () => {
  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={css.container}>
      <CTALink onClick={onClick}>Back to top</CTALink>
    </div>
  );
};

export default BackToTop;
