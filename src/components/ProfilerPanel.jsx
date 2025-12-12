import React, { useState, useMemo } from "react";

/**
 * ProfilerPanel
 * Props:
 * - entries: array of profiling entries collected from React Profiler
 * - onDownload: function to export entries as JSON
 * - onClear: function to clear entries
 */
export default function ProfilerPanel({ entries = [], onDownload, onClear }) {
  const [collapsed, setCollapsed] = useState(false);

  // Show last N entries (already ordered newest-first in App)
  const maxShown = 20;
  const shown = useMemo(() => entries.slice(0, maxShown), [entries]);

  return (
    <div className={`profiler-panel ${collapsed ? "collapsed" : ""}`}>
      <div className="profiler-panel__header">
        <div className="profiler-panel__summary">
          <strong>Profiler Panel</strong>
          <span className="profiler-panel__meta">Total entries: {entries.length}</span>
        </div>

        <div className="profiler-panel__controls">
          <button onClick={() => setCollapsed((c) => !c)}>
            {collapsed ? "Expand" : "Collapse"}
          </button>
          <button onClick={onDownload} disabled={entries.length === 0}>
            Download logs
          </button>
          <button onClick={onClear} disabled={entries.length === 0}>
            Clear logs
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="profiler-panel__list">
          {shown.length === 0 ? (
            <div className="profiler-panel__empty">No profiling data yet.</div>
          ) : (
            <table className="profiler-panel__table">
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
                {shown.map((e, i) => (
                  <tr key={`${e.id}-${e.timestamp}-${i}`}>
                    <td>{new Date(e.timestamp).toLocaleString()}</td>
                    <td>{e.id}</td>
                    <td>{e.phase}</td>
                    <td>{Number(e.actualDuration).toFixed(2)}</td>
                    <td>{Number(e.baseDuration).toFixed(2)}</td>
                    <td>{e.interactionsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {entries.length > maxShown && (
            <div className="profiler-panel__more">Showing {maxShown} of {entries.length} entries</div>
          )}
        </div>
      )}
    </div>
  );
}
