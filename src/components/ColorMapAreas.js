import React, { useState, useRef } from "react";
import Region from "./Region";

const ColorMapAreas = ({
  boundary,
  categories,
  readOnly,
  regionDefs,
  states,
  onSwitchCategory
}) => {
  const [hoveringOver, setHoveringOver] = useState();
  const [colorForHoldAndDragPaint, setColorForHoldAndDragPaint] = useState(
    null
  );

  const offsetX = useRef();
  const offsetY = useRef();

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
        onMouseOver={e => {
          e.stopPropagation();
          offsetX.current.beginElement(); //triggers animation
          offsetY.current.beginElement(); //triggers animation

          if (readOnly) return;
          setHoveringOver(kode);
          if (colorForHoldAndDragPaint !== null)
            onSwitchCategory &&
              onSwitchCategory(e, kode, colorForHoldAndDragPaint);
        }}
        onMouseDown={e => {
          e.stopPropagation();
          if (readOnly) return;
          const newState = (state + 1) % categories.length;
          onSwitchCategory && onSwitchCategory(e, kode, newState);
          setColorForHoldAndDragPaint(newState);
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
        setHoveringOver(null);
        setColorForHoldAndDragPaint(null);
      }}
      onMouseUp={e => {
        e.stopPropagation();
        if (readOnly) return;
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
        <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="4" dy="4"></feOffset>
          <feGaussianBlur
            result="blurOut"
            in="offOut"
            stdDeviation="4"
          ></feGaussianBlur>
          <feColorMatrix
            result="matrixOut"
            in="blurOut"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0"
          />
          <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
        </filter>
        <filter id="f2" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="8" dy="8">
            <animate
              ref={offsetX}
              attributeName="dx"
              calcMode="linear"
              values="0;8"
              dur="0.3s"
            />
            <animate
              ref={offsetY}
              attributeName="dy"
              calcMode="linear"
              begin="0s"
              dur="0.3s"
              values="0;8"
            />
          </feOffset>
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4">
            <animate
              ref={offsetY}
              attributeName="stdDeviation"
              calcMode="linear"
              begin="0s"
              dur="0.3s"
              values="0;8"
            />
          </feGaussianBlur>
          <feColorMatrix
            result="matrixOut"
            in="blurOut"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0"
          />
          <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
        </filter>
      </defs>
      <rect width="100%" height="100%" style={{ fill: "hsl(10, 96%, 57%)" }} />{" "}
      <g style={{ filter: "url(#f1)" }}>{svgRegions}</g>
    </svg>
  );
};

export default ColorMapAreas;
