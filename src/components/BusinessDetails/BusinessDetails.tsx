import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";

import { BusinessInterface } from "../../types/types";
import { businesses, fetchBusinesses, loading, error } from "../../features/businessSlice/businessSlice";
import { prevPageClickHandler, nextPageClickHandler } from "../../utils/pagination";
import Navigation from "../UI/Navigation/Navigation";
import Business from "../Business/Business";
import Spinner from "../UI/Spinner/Spinner";
import ErrorBoundary from "../UI/ErrorBoundary/ErrorBoundary";
import classes from "./BusinessDetails.module.css";

interface Props extends RouteComponentProps {}

const BusinessDetails = ({ location }: Props) => {
  const [firstItem, setFirstItem] = useState<number>(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const rejected = useSelector(error);
  const isLoading = useSelector(loading);
  const selectedBusiness = useSelector(businesses)!.filter((el: BusinessInterface) => el.id === location.pathname.split("/")[1])[0];

  const nearbyPlaces = useSelector(businesses)!
    .filter((el: BusinessInterface) => el.address.country === selectedBusiness.address.country)
    .map((business: BusinessInterface) => (
      <Business key={business.id} clicked={() => history.push({ pathname: `/${business.id}`, state: { ...business } })} {...business} />
    ));

  // Fetch the businesses, in case the user accesses this view without redirection
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
      {selectedBusiness && !isLoading && !rejected ? (
        <section className={classes.BusinessDetails}>
          <img className={classes.BusinessDetails_Image} src={selectedBusiness.image} alt={`${selectedBusiness.name}'s business`} />
          <div className={classes.BusinessDetails_Info}>
            <div className={classes.BusinessDetails_Info_Address}>
              <h1>Address</h1>
              <p>{selectedBusiness.address.street}</p>
              <p>
                {selectedBusiness.address.city}, {selectedBusiness.address.zip} {selectedBusiness.address.number}
              </p>
            </div>
            <div className={classes.BusinessDetails_Info_Contact}>
              <h1>Contact</h1>
              <p>{selectedBusiness.phone}</p>
              <p>{selectedBusiness.email}</p>
            </div>
            <div className={classes.BusinessDetails_Info_NearbyPlaces}>
              <div className={classes.BusinessDetails_Info_PaginationWrapper}>
                <h1>Nearby Places</h1>
                <div className={classes.BusinessDetails_Info_Pagination}>
                  <span onClick={() => prevPageClickHandler(4, firstItem, setFirstItem)}>&lt;</span>
                  <span onClick={() => nextPageClickHandler(nearbyPlaces, 4, firstItem, setFirstItem)}>&gt;</span>
                </div>
              </div>
              {nearbyPlaces.slice(firstItem, firstItem + 4)}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </main>
  );
};

export default withRouter(BusinessDetails);
