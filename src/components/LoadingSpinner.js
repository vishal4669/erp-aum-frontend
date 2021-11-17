import React from 'react';

 const LoadingSpinner = () => (
   <div className="spinner-border bg-soft-primary bg-primary m-1" role="status" style={{height:'20px',width:'20px'}}>
      <span className="sr-only"> Loading...</span>
   </div>
 );

export default LoadingSpinner;
