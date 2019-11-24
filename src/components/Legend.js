import React from "react";

const Legend = ({ categories, x = 0, y = 20, size = 40 }) => (
  <svg x={x} y={y}>
    {Object.keys(categories).map(key => {
      const e = categories[key];
      return (
        <LegendItem
          key={key}
          x={e.x}
          y={e.y * 1}
          size={size}
          title={e.title}
          tooltip={e.tooltip}
          fill={e.normal.fill}
        />
      );
    })}
  </svg>
);

const LegendItem = ({ title, tooltip, fill, x, y, size }) => (
  <svg x={x} y={y}>
    <rect
      width={size}
      height={size}
      style={{
        fill: fill,
        stroke: "rgb(0,0,0)",
        strokeWidth: 1,
        filter: "url(#f1)"
      }}
    ></rect>
    <text fontSize={32} x={1.5 * size} y={32}>
      {title}
    </text>
    <title>{tooltip}</title>
  </svg>
);

export default Legend;