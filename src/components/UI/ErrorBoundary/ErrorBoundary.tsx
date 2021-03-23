import React from "react";

import classes from "./ErrorBoundary.module.css";

interface Props {
  error: string;
}

const ErrorBoundary = ({ error }: Props) => {
  return (
    <div className={classes.ErrorBoundary}>
      <p>{error}</p>
    </div>
  );
};

export default ErrorBoundary;
