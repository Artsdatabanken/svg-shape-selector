import React, { useCallback, useState } from "react";
import ColorMapAreas from "./components/ColorMapAreas";
import countyListLand from "./countyListLand";
import boundary from "./map";
import Legend from "./Legend";

const Spredningskart = ({ readonly }) => {
  const categories = [
    {
      title: "Ikke kjent",
      normal: {
        stroke: "#777",
        fill: "hsl(10, 96%, 97%)"
      },
      highlight: {
        stroke: "#333",
        strokeWidth: 3,
        fill: "hsl(10, 96%, 97%)"
      }
    },
    {
      key: "assumed",
      title: "Antatt",
      normal: {
        stroke: "#777",
        fill: "#fc8169"
      },
      highlight: {
        stroke: "#333",
        strokeWidth: 3,
        fill: "#fc8169"
      }
    },
    {
      key: "known",
      title: "Kjent",
      normal: {
        stroke: "#555",
        fill: "#ff4c29"
      },
      highlight: {
        stroke: "#333",
        strokeWidth: 3,
        fill: "#ff4c29"
      }
    },
    {
      key: "extinct",
      title: "Utdødd",
      normal: {
        strokeWidth: 1,
        stroke: "#333",
        fill: "url(#diagonalHatch)"
      },
      highlight: {
        stroke: "#333",
        strokeWidth: 3,
        fill: "url(#diagonalHatch)"
      }
    }
  ];

  const [states, setStates] = useState({});

  const handleMouseDown = useCallback(
    (e, fylke, state) => {
      states[fylke] = state;
      setStates(states);
    },
    [states]
  );

  const fylkerArray = countyListLand.map(fylke => {
    const curState = states[fylke] || 0;
    const active = categories[curState];
    return {
      id: fylke.Value,
      title: `${fylke.Text}: ${active.title}`,
      style: active
    };
  });

  const fylker = fylkerArray.reduce((o, currentArray) => {
    const key = currentArray.id,
      value = currentArray;
    o[key] = value;
    return o;
  }, {});
  return (
    <div>
      <div
        style={{
          border: "1px solid #888",
          position: "absolute",
          left: 50,
          top: 50,
          height: 500,
          width: 500
        }}
      >
        <ColorMapAreas
          readonly={readonly}
          categories={categories}
          boundary={boundary}
          onMouseDown={handleMouseDown}
          fylker={fylker}
          states={states}
        />
      </div>
      {<Legend categories={categories} />}
    </div>
  );
};

export default Spredningskart;
