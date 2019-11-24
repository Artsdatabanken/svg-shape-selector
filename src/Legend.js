import React from "react";

const Legend = ({ categories, size = 40 }) => (
  <g>
    {Object.keys(categories).map(key => {
      const e = categories[key];
      return (
        <LegendItem
          key={key}
          x={e.x}
          y={e.y * 0.8}
          size={size}
          title={e.title}
          fill={e.normal.fill}
        />
      );
    })}
  </g>
);

const LegendItem = ({ title, fill, x, y, size }) => (
  <svg x={x} y={y}>
    <rect
      width={size}
      height={size}
      style={{ fill: fill, stroke: "rgb(0,0,0)", strokeWidth: 1 }}
    />
    <text fontSize={32} x={1.5 * size} y={32}>
      {title}
    </text>
  </svg>
);

export default Legend;
