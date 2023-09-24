import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants/RouteConstants";
import { Splash } from "../Splash";

export const App = () => {
  const { token } = useSelector(store => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(ROUTE_CONSTANTS.BOOKINGS)
    } else {
      navigate(ROUTE_CONSTANTS.LOGIN)
    }
  }, [])
  return (
    <Splash />
  );
}