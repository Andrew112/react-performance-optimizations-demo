import "./styles.css";

import React, { Profiler, useCallback, useRef, useState } from "react";

import ExpensiveList from "./components/ExpensiveList";
import ProfilerPanel from "./components/ProfilerPanel";
import { generateItems } from "./utils/generateItems";

function App() {
  const [count, setCount] = useState(0);
  const [items] = useState(generateItems);
  const [filter, setFilter] = useState("all");
  const [enableProfiling, setEnableProfiling] = useState(true);

  // New: profiling entries collected in state
  const [profilingEntries, setProfilingEntries] = useState([]);
  
  // Flag to prevent infinite loops when updating state in Profiler callback
  const isUpdatingRef = useRef(false);

  // Profiler callback now records data into state (rather than just console.table)
  const onRenderCallback = (
    id,                 // Profiler ID
    phase,              // "mount" or "update"
    actualDuration,     // Time spent rendering the committed update
    baseDuration,       // Estimated duration without memoization
    startTime,          // When React started rendering
    commitTime,         // When React committed
    interactions        // Interaction set
  ) => {
    // Still log a compact console message for quick debugging
    console.log(`⚡ Profiler Report: ${id}`, {
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactionsCount: interactions ? interactions.size : 0
    });

    // Use flag and queueMicrotask to prevent infinite loops
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    queueMicrotask(() => {
      const entry = {
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactionsCount: interactions ? interactions.size : 0,
        timestamp: Date.now()
      };

      // Keep most recent entries at the front
      setProfilingEntries((prev) => [entry, ...prev]);
      isUpdatingRef.current = false;
    });
  };

  // Stable callback example: item click handler
  const handleItemClick = useCallback((item) => {
    console.log("Item clicked:", item);
  }, []);

  // Export profiling logs as a JSON file
  const downloadProfiling = () => {
    try {
      const data = JSON.stringify(profilingEntries, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `profiling-logs-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download profiling logs", err);
    }
  };

  const clearProfiling = () => {
    setProfilingEntries([]);
  };

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

      {/* Profiler (kept, but onRenderCallback now writes into state) */}
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

      {/* New: ProfilerPanel UI */}
      <ProfilerPanel
        entries={profilingEntries}
        onDownload={downloadProfiling}
        onClear={clearProfiling}
      />
    </div>
  );
}

export default App;
