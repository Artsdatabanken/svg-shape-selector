import React, { useState } from "react";
import ColorMapAreas from "./components/ColorMapAreas";
import countyListLand from "./countyListLand";
import boundary from "./map";
import Legend from "./Legend";

const Spredningskart = ({ readonly }) => {
  const categories = {
    none: {
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
    assumed: {
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
    known: {
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
    extinct: {
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
  };

  const defaultStates = [
    {
      key: "none",
      title: "Ikke kjent"
    },
    {
      key: "known",
      title: "Kjent",
      values: {}
    },
    {
      key: "assumed",
      title: "Antatt",
      values: {}
    },
    {
      key: "extinct",
      title: "Utdødd",
      values: {}
    }
  ];

  const [states, setStates] = useState(defaultStates);
  const [paintWithState, setPaintWithState] = useState();

  const getCurrentState = function(fylke, states) {
    let defaultState = null;
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      if (!state.values) defaultState = state;
      else if (state.values[fylke]) return state;
    }
    return defaultState;
  };

  const getNextState = function(curState) {
    const currentIndex = getStateIndex(curState.key) || 0;
    return (currentIndex + 1) % states.length;
  };

  const getStateIndex = function(key) {
    for (let i = 0; i < states.length; i++) if (key === states[i].key) return i;

    throw new Error(`Unknown map state ${key}`);
  };

  const handleMouseOver = function(e, fylke) {
    e.stopPropagation();
    if (paintWithState == null) return;
    setChecked(fylke, paintWithState);
  };

  const handleMouseUp = function(e) {
    e.stopPropagation();
    setPaintWithState(null);
  };

  const handleMouseDown = function(e, fylke) {
    e.stopPropagation();
    const curState = getCurrentState(fylke, states);
    const newState = getNextState(curState);
    setPaintWithState(newState);
    setChecked(fylke, newState);
  };

  const setChecked = function(fylke, state) {
    for (let i = 0; i < states.length; i++)
      if (states[i].values) {
        states[i].values[fylke] = state === i;
        console.log(states[i].values[fylke], state, i);
        setStates(states);
      }
  };

  const fylkerArray = countyListLand.map(fylke => {
    const active = getCurrentState(fylke.Value, states);
    return {
      id: fylke.Value,
      title: `${fylke.Text}: ${active.title}`,
      style: active.key
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
        onMouseLeave={() => {
          setPaintWithState(null);
        }}
      >
        <ColorMapAreas
          readonly={readonly}
          styles={categories}
          boundary={boundary}
          onMouseLeave={() => {
            setPaintWithState(null);
          }}
          onMouseDown={(e, fylke) => handleMouseDown(e, fylke)}
          onMouseUp={e => handleMouseUp(e)}
          onMouseOver={(e, fylke) => handleMouseOver(e, fylke)}
          fylker={fylker}
        />
      </div>
      {<Legend categories={categories} />}
    </div>
  );
};

export default Spredningskart;
