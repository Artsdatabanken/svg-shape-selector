import React, { useState } from "react";
import Region from "./Region";

const ColorMapAreas = ({
  boundary,
  categories,
  readOnly,
  fylker: regionDefs,
  states,
  onMouseDown,
  onMouseUp
}) => {
  const [hoveringOver, setHoveringOver] = useState();
  const [colorForHoldAndDragPaint, setColorForHoldAndDragPaint] = useState(
    null
  );

  const svgRegions = Object.keys(regionDefs).map(kode => {
    const regionDef = regionDefs[kode];
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
        bringToFront={hoveringOver === kode}
        readonly={readOnly}
        onMouseLeave={e => setHoveringOver(null)}
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
          <path
            d="M-10,10 l20,-20
           M0,40 l40,-40
           M30,50 l20,-20"
            style={{ stroke: "#ccc", strokeWidth: 15 }}
          />
        </pattern>
        <filter id="f2" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g>{svgRegions}</g>
    </svg>
  );
};

export default ColorMapAreas;
