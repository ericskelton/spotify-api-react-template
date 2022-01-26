import React from 'react'
import {ThreeDots} from 'react-loader-spinner';

const LoadingIndicator = props => {
  
    return (
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
        <ThreeDots type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>)
  };

  export default LoadingIndicator