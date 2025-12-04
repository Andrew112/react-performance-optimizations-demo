import "./styles.css";

import React, { Profiler, useCallback, useState } from "react";

import ExpensiveList from "./components/ExpensiveList";
import { generateItems } from "./utils/generateItems";

function App() {
  const [count, setCount] = useState(0);
  const [items] = useState(generateItems);
  const [filter, setFilter] = useState("all");
  const [enableProfiling, setEnableProfiling] = useState(true);

  // Profiler callback
  const onRenderCallback = (
    id,                 // Profiler ID
    phase,              // "mount" or "update"
    actualDuration,     // Time spent rendering the committed update
    baseDuration,       // Estimated duration without memoization
    startTime,          // When React started rendering
    commitTime,         // When React committed
    interactions        // Interaction set
  ) => {
    console.log(`⚡ Profiler Report: ${id}`);
    console.table({
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions: interactions.size
    });
  };

  const handleItemClick = useCallback((item) => {
    console.log("Item clicked:", item);
  }, []);

  return (
    <div className="container">
      <h1>React Performance Optimization Demo</h1>

      <button onClick={() => setEnableProfiling(!enableProfiling)}>
        {enableProfiling ? "Disable Profiler" : "Enable Profiler"}
      </button>

      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>

      <br /><br />

      <label>Filter: </label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="even">Even</option>
        <option value="odd">Odd</option>
      </select>

      {enableProfiling ? (
        <Profiler id="ExpensiveListProfiler" onRender={onRenderCallback}>
          <ExpensiveList
            items={items}
            filter={filter}
            onItemClick={handleItemClick}
          />
        </Profiler>
      ) : (
        <ExpensiveList
          items={items}
          filter={filter}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
}

export default App;
