import React, { useState } from "react";

function ProfilerPanel({ entries = [], onDownload, onClear }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const ms = date.getMilliseconds().toString().padStart(3, '0');
    return date.toLocaleTimeString() + "." + ms;
  };

  const lastEntries = entries.slice(0, 20);

  return (
    <div className="profiler-panel">
      <div className="profiler-panel__header">
        <h3>Profiler Panel</h3>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className="profiler-panel__controls">
            <p>Total entries: {entries.length}</p>
            <button onClick={onDownload} disabled={entries.length === 0}>
              Download Logs
            </button>
            <button onClick={onClear} disabled={entries.length === 0}>
              Clear Logs
            </button>
          </div>

          {lastEntries.length > 0 ? (
            <div className="profiler-panel__list">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phase</th>
                    <th>Actual (ms)</th>
                    <th>Base (ms)</th>
                    <th>Interactions</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {lastEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.id}</td>
                      <td>{entry.phase}</td>
                      <td>{entry.actualDuration.toFixed(2)}</td>
                      <td>{entry.baseDuration.toFixed(2)}</td>
                      <td>{entry.interactionsCount}</td>
                      <td>{formatTimestamp(entry.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {entries.length > 20 && (
                <p className="profiler-panel__note">
                  Showing last 20 of {entries.length} entries
                </p>
              )}
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
