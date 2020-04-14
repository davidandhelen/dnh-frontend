// @flow
import React from "react";

import CTAButton from "./CTAButton";

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
      <CTAButton onClick={onClick}>Back to top</CTAButton>
    </div>
  );
};

export default BackToTop;
