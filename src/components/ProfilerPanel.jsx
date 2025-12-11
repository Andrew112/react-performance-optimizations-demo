import React, { useState } from "react";

function ProfilerPanel({ entries, onDownload, onClear }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatDuration = (duration) => {
    return duration.toFixed(2);
  };

  // Show last 20 entries
  const displayedEntries = entries.slice(0, 20);

  return (
    <div className="profiler-panel">
      <div className="profiler-panel__header">
        <h3>React Profiler Data</h3>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="profiler-panel__toggle"
        >
          {isCollapsed ? "▼ Expand" : "▲ Collapse"}
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className="profiler-panel__summary">
            <p>
              <strong>Total Entries:</strong> {entries.length}
            </p>
            <p>
              <strong>Showing:</strong> Last {Math.min(20, entries.length)}{" "}
              entries
            </p>
          </div>

          <div className="profiler-panel__controls">
            <button onClick={onDownload} disabled={entries.length === 0}>
              📥 Download Logs (JSON)
            </button>
            <button onClick={onClear} disabled={entries.length === 0}>
              🗑️ Clear Logs
            </button>
          </div>

          {displayedEntries.length > 0 ? (
            <div className="profiler-panel__list">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>ID</th>
                    <th>Phase</th>
                    <th>Actual (ms)</th>
                    <th>Base (ms)</th>
                    <th>Interactions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{formatTimestamp(entry.timestamp)}</td>
                      <td>{entry.id}</td>
                      <td>{entry.phase}</td>
                      <td>{formatDuration(entry.actualDuration)}</td>
                      <td>{formatDuration(entry.baseDuration)}</td>
                      <td>{entry.interactionsCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="profiler-panel__empty">No profiling data yet</p>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilerPanel;
