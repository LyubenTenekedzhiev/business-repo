import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchBusinesses, businesses, loading, error } from "../../features/businessSlice/businessSlice";
import { BusinessInterface } from "../../types/types";
import Business from "../Business/Business";
import Navigation from "../UI/Navigation/Navigation";
import Spinner from "../UI/Spinner/Spinner";
import ErrorBoundary from "./../UI/ErrorBoundary/ErrorBoundary";
import classes from "./BusinessesList.module.css";

const BusinessesList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(loading);
  const rejected = useSelector(error);
  const businessesList = useSelector(businesses)!.map((business: BusinessInterface) => (
    <Business key={business.id} clicked={() => history.push({ pathname: `/${business.id}` })} {...business} />
  ));

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  if (isLoading) return <Spinner />;
  if (rejected && !isLoading) {
    return (
      <div>
        <Navigation />
        <ErrorBoundary error={rejected} />
      </div>
    );
  }

  return (
    <main>
      <Navigation />
      <section className={classes.BusinessesWrapper}>
        <div className={classes.BusinessWrapper_Header}>
          <h4 className={classes.BusinessWrapper_Header_Name}>Name</h4>
          <h4 className={classes.BusinessWrapper_Header_Description}>Description</h4>
        </div>
        {businessesList.length === 0 && !isLoading ? (
          <h2 className={classes.BusinessesWrapper_NoResults}>There aren't any businesses yet</h2>
        ) : (
          businessesList
        )}
      </section>
    </main>
  );
};

export default BusinessesList;
