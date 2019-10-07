import React from "react";

import css from "./Splash.module.scss";

const Splash = () => {
  return (
    <div className={css.container}>
      <h1 className={css.date}>10.10.2020</h1>
      <h3 className={css.honoring}>David & Helen</h3>
    </div>
  );
};

export default Splash;
