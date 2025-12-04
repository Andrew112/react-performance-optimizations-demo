import React from "react";

const ComplexComponent = React.memo(
  ({ data, metadata }) => {
    return (
      <div>
        <h2>{metadata.title}</h2>
        <p>{data.content}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.data.content === nextProps.data.content &&
      prevProps.metadata.title === nextProps.metadata.title
    );
  }
);

export default ComplexComponent;
