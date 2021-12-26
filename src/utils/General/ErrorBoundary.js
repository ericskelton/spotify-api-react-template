import react, { useState, useEffect } from "react";
import useCounter from "../hooks/useCounter";
import Error from "../../ui/Error/Error";
import { Navigate } from "react-router-dom";
export default function ErrorBoundary(props) {
  const { children, displayError, handleType, handleTime, fallBack } = props;
  try {
    return <>{children}</>;
  } catch (e) {
    setError(e);
    if (!displayError) {
      e = {};
    } else if (process.env.REACT_APP_ENV !== "dev") {
      // if not dev, don't  show the error
      e = {};
    }

    
  }
}
