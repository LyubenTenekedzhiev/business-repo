import React from "react";

import { BusinessInterface } from "../../types/types";
import classes from "./Business.module.css";

interface Props extends BusinessInterface {
  clicked: () => void;
}

const Business = ({ name, description, address, clicked }: Props) => {
  return (
    <>
      {window.location.href === "https://dev-ocean.netlify.app/" || window.location.href === "http://localhost:3000/" ? (
        <div className={classes.Business} onClick={clicked}>
          <h4 className={classes.Business_Name}>{name}</h4>
          <h4 className={classes.Business_Description}>{description}</h4>
        </div>
      ) : (
        <div className={classes.Business_Nearby} onClick={clicked}>
          <p className={classes.Business_Nearby_Name}>{name}</p>
          <p className={classes.Business_Nearby_Description}>
            {address.street}, {address.number}, {address.city}, {address.country} {address.zip}
          </p>
        </div>
      )}
    </>
  );
};

export default Business;
