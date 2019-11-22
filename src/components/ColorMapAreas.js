import React, { useState } from "react";

const ColorMapAreas = ({
  boundary,
  styles,
  readOnly,
  fylker,
  onMouseDown,
  onMouseUp
}) => {
  const [hoveringOver, setHoveringOver] = useState();

  const svgRegions = Object.keys(fylker).map(kode => {
    const prefs = fylker[kode];
    const mainStyle = styles[prefs.style];
    let style = mainStyle.normal;
    if (hoveringOver === kode) style = mainStyle.highlight;
    return (
      <Region
        key={kode}
        kode={kode}
        title={prefs.title}
        boundaryPath={boundary.regions[kode]}
        style={style}
        readonly={readOnly}
        onMouseLeave={e => setHoveringOver(null)}
        onMouseOver={e => !readOnly && setHoveringOver(kode)}
        onMouseDown={e => !readOnly && onMouseDown(e, kode)}
        onMouseUp={e => !readOnly && onMouseUp(e, kode)}
      />
    );
  });
  return (
    <svg
      preserveAspectRatio="xMidYMin meet"
      width="100%"
      height="auto"
      viewBox={boundary.viewbox}
    >
      <defs>
        <pattern
          id="diagonalHatch"
          viewBox="0,0,40,40"
          width={15}
          height={15}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-10,10 l20,-20
           M0,40 l40,-40
           M30,50 l20,-20"
            style={{ stroke: "black", strokeWidth: 6 }}
          />
        </pattern>
      </defs>
      <g>{svgRegions}</g>
    </svg>
  );
};

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

export default ColorMapAreas;
