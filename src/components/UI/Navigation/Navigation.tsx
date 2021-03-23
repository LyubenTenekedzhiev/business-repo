import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.Navigation}>
      <NavLink to='/' className={classes.NavigationLink}>
        Logo
      </NavLink>
    </nav>
  );
};

export default Navigation;
