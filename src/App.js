import "./styles.css";

import React, { Profiler, useCallback, useState } from "react";

import ExpensiveList from "./components/ExpensiveList";
import ProfilerPanel from "./components/ProfilerPanel";
import { generateItems } from "./utils/generateItems";

function App() {
  const [count, setCount] = useState(0);
  const [items] = useState(generateItems);
  const [filter, setFilter] = useState("all");
  const [enableProfiling, setEnableProfiling] = useState(true);
  const [profilingEntries, setProfilingEntries] = useState([]);

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
    const entry = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactionsCount: interactions.size,
      timestamp: Date.now()
    };

    // Add entry to beginning of array (most recent first)
    setProfilingEntries(prev => [entry, ...prev]);

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

  const handleDownloadLogs = () => {
    const dataStr = JSON.stringify(profilingEntries, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `profiler-logs-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    setProfilingEntries([]);
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

      <ProfilerPanel
        entries={profilingEntries}
        onDownload={handleDownloadLogs}
        onClear={handleClearLogs}
      />
    </div>
  );
}

export default App;
