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

export default ColorMapAreas;
