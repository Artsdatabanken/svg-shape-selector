import React from "react";
import LegendItem from './LegendItem'

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


export default Legend;
