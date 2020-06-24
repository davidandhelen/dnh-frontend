import React from "react";
import { Heading1 } from "../../kit/typography";
import css from "./NoPermission.module.scss";

const NoPermission = () => (
  <div className={css.container}>
    <Heading1>
      I&apos;m sorry you don&apos;t have permission to view this page.
    </Heading1>
  </div>
);

export default NoPermission;
