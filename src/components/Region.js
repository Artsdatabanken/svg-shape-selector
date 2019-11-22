import React from "react";

const Region = ({
  kode,
  title,
  boundaryPath,
  style,
  readonly,
  onMouseDown,
  onMouseUp,
  onMouseOver,
  onMouseLeave
}) => {
  return (
    <g
      key={kode}
      stroke={style.stroke}
      strokeWidth={style.strokeWidth}
      fill={style.fill}
      style={{ cursor: readonly ? "arrow" : "hand" }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {boundaryPath}
      <title>{title}</title>
    </g>
  );
};

export default Region;
