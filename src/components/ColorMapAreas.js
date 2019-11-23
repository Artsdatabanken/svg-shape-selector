import React, { useState } from "react";
import Region from "./Region";

const ColorMapAreas = ({
  boundary,
  categories,
  readOnly,
  regionDefs,
  states,
  onMouseDown,
  onMouseUp
}) => {
  const [hoveringOver, setHoveringOver] = useState();
  const [colorForHoldAndDragPaint, setColorForHoldAndDragPaint] = useState(
    null
  );

  // Make sure the mouseovered item to be rendered on top
  const sortedHightlightedLast = regionDefs.sort(a =>
    a.kode === hoveringOver ? 1 : -1
  );
  const svgRegions = sortedHightlightedLast.map(regionDef => {
    const kode = regionDef.kode;
    const state = states[kode] || 0;
    const mainStyle = categories[state];
    let style = mainStyle.normal;
    if (hoveringOver === kode) style = mainStyle.highlight;
    return (
      <Region
        key={kode}
        kode={kode}
        title={regionDef.title}
        boundaryPath={boundary.regions[kode]}
        style={style}
        readonly={readOnly}
        onMouseLeave={() => setHoveringOver(null)}
        onMouseOver={e => {
          e.stopPropagation();
          if (readOnly) return;
          setHoveringOver(kode);
          if (colorForHoldAndDragPaint !== null)
            onMouseDown(e, kode, colorForHoldAndDragPaint);
        }}
        onMouseDown={e => {
          e.stopPropagation();
          if (readOnly) return;
          const newState = (state + 1) % categories.length;
          onMouseDown && onMouseDown(e, kode, newState);
          setColorForHoldAndDragPaint(newState);
        }}
        onMouseUp={e => {
          e.stopPropagation();
          if (readOnly) return;
          onMouseUp && onMouseUp(e, kode);
          setColorForHoldAndDragPaint(null);
        }}
      />
    );
  });
  return (
    <svg
      preserveAspectRatio="xMidYMin meet"
      width="100%"
      height="auto"
      viewBox={boundary.viewbox}
      onMouseLeave={() => {
        setColorForHoldAndDragPaint(null);
      }}
    >
      <defs>
        <pattern
          id="diagonalHatch"
          viewBox="0,0,40,40"
          width={15}
          height={15}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(90) scale(1.3 1.3)"
        >
          <g>
            <rect
              width="40"
              height="40"
              style={{ fill: "hsl(10, 96%, 97%)" }}
            />
            <path
              d="M-10,10 l20,-20
           M0,40 l40,-40
           M30,50 l20,-20"
              style={{ stroke: "#ddd", strokeWidth: 15 }}
            />
          </g>
        </pattern>
        <filter id="f2" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="25" />
          <feColorMatrix
            result="matrixOut"
            in="blurOut"
            type="matrix"
            values="0.3 0 0 0 0 0 0.3 0 0 0 0 0 0.3 0 0 0 0 0 0.7 0"
          />
          <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
        </filter>
      </defs>
      <g>{svgRegions}</g>
    </svg>
  );
};

export default ColorMapAreas;
