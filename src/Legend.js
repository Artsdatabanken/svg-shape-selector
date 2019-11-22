import React from "react";

const Legend = ({ categories }) => (
  <div style={{ position: "absolute", display: "inline-block", bottom: 50 }}>
    {Object.keys(categories).map(key => {
      const x = categories[key];
      return <LegendItem key={key} title={x.title} fill={x.normal.fill} />;
    })}
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
