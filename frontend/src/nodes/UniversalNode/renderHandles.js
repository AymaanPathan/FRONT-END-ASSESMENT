import { Handle } from "reactflow";

export const renderConnectionHandle = (handleConfig, nodeId) => (
  <Handle
    key={handleConfig.id}
    type={handleConfig.type}
    position={handleConfig.position}
    id={`${nodeId}-${handleConfig.id}`}
    style={{
      top: handleConfig.topOffset,
      background: handleConfig.color || "#64748b",
      width: "8px",
      height: "8px",
    }}
  />
);

export const renderDynamicHandle = (handleConfig, nodeId) => (
  <div key={handleConfig.id} style={{ position: "relative" }}>
    <Handle
      type={handleConfig.type}
      position={handleConfig.position}
      id={`${nodeId}-${handleConfig.id}`}
      style={{
        top: handleConfig.topOffset,
        background: handleConfig.color || "#10b981",
        width: "8px",
        height: "8px",
        left: "-4px",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: "-60px",
        top: handleConfig.topOffset - 8,
        fontSize: "10px",
        color: "#10b981",
        fontWeight: "bold",
        whiteSpace: "nowrap",
      }}
    >
      {handleConfig.label}
    </div>
  </div>
);
