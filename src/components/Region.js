import React from "react";

const Region = ({
  kode,
  title,
  boundaryPath,
  style,
  readonly,
  bringToFront,
  onMouseDown,
  onMouseUp,
  onMouseOver,
  onMouseLeave
}) => {
  return (
    <g
      key={kode}
      {...style}
      style={{ cursor: readonly ? "arrow" : "hand" }}
      zindex={bringToFront ? 10 : 0}
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
