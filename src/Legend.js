import React from "react";

const Legend = ({ categories }) => (
  <g>
    {Object.keys(categories).map(key => {
      const e = categories[key];
      return (
        <LegendItem
          key={key}
          x={e.x}
          y={e.y}
          title={e.title}
          fill={e.normal.fill}
        />
      );
    })}
  </g>
);

const LegendItem = ({ title, fill, x, y }) => (
  <svg x={x} y={y}>
    <rect
      width="24"
      height="24"
      style={{ fill: fill, stroke: "rgb(0,0,0)", strokeWidth: 1 }}
    />
    <text x={34} y={20}>
      {title}
    </text>
  </svg>
);

export default Legend;
