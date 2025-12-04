import React from "react";

const ExpensiveListItem = React.memo(({ item, onClick }) => {
  console.log("ExpensiveListItem rendered:", item.id);

  return (
    <div
      style={{
        border: "1px solid #444",
        margin: "6px",
        padding: "8px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
      onClick={() => onClick(item)}
    >
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  );
});

export default ExpensiveListItem;
 