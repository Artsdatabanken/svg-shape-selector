import React from "react";

const Legend = ({ states, styles }) => (
  <div style={{ position: "absolute", display: "inline-block", bottom: 50 }}>
    {states.map(x => (
      <LegendItem
        key={x.key}
        title={x.title}
        fill={styles[x.key].normal.fill}
      />
    ))}
  </div>
);

const LegendItem = ({ title, fill }) => (
  <div style={{ display: "inline-block", marginRight: "10px" }}>
    <span
      style={{
        display: "inline-block",
        borderWidth: "1px",
        borderStyle: "solid",
        width: "16px",
        height: "16px",
        backgroundColor: fill
      }}
    />
    <span
      style={{
        display: "inline-block",
        verticalAlign: "text-bottom"
      }}
    >
      &nbsp;{title}
    </span>
  </div>
);

export default Legend;
