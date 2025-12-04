import React, { useMemo } from "react";

import ExpensiveListItem from "./ExpensiveListItem";

const ExpensiveList = React.memo(({ items, filter, onItemClick }) => {
  console.log("ExpensiveList rendered");

  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter(
      (item) => filter === "all" || item.category === filter
    );
  }, [items, filter]);

  return (
    <div>
      {filteredItems.map((item) => (
        <ExpensiveListItem
          key={item.id}
          item={item}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
});

export default ExpensiveList;
