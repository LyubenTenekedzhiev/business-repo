import React, { ReactElement } from "react";

import classes from "./Spinner.module.css";

function Spinner(): ReactElement {
  return (
    <div className={classes.LoaderWrapper}>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
}

export default Spinner;
