import react, { useState, useEffect } from "react";
import useCounter from "../hooks/useCounter";
import ErrorRoute from '../../routes/Error/ErrorRoute';
import { Navigate } from "react-router-dom";
export default function ErrorBoundary(props) {
  const { children, displayError, handleType, handleTime, fallBack, redirectLocation } = props;
  try {
    return <>{children}</>;
  } catch (e) {
    if (!displayError) {
      e = {};
    } else if (process.env.REACT_APP_ENV !== "dev") {
      // if not dev, don't  show the error
      e = {};
    }

    return <ErrorRoute error={e} redirectLocation = {redirectLocation} handleType={handleType} handleTime={handleTime} fallBack={fallBack} /> 
  }
}
