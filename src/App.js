import React, { useState } from "react";
import ColorMapAreas from "./components/ColorMapAreas";
import countyListLand from "./countyListLand";

const Spredningskart = ({ readonly }) => {
  const styles = {
    none: {
      normal: {
        stroke: "#777",
        fill: "hsl(10, 96%, 97%)"
      },
      highlight: {
        stroke: "#222",
        strokeWidth: 3,
        fill: "hsl(10, 96%, 97%)"
      }
    },
    assumed: {
      normal: {
        stroke: "#777",
        fill: "#fc8169"
      },
      highlight: {
        stroke: "#222",
        strokeWidth: 3,
        fill: "#fc8169"
      }
    },
    known: {
      normal: {
        stroke: "#555",
        fill: "#ff4c29"
      },
      highlight: {
        stroke: "#222",
        strokeWidth: 3,
        fill: "#ff4c29"
      }
    },
    extinct: {
      normal: {
        stroke: "#555",
        fill: "#444"
      },
      highlight: {
        stroke: "#222",
        strokeWidth: 3,
        fill: "#444"
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
  const [a, setA] = useState(0);

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
    setA(a + 1);
    console.log("pain", curState, newState, paintWithState);
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
      {a}
      <div
        style={{
          border: "1px solid blue",
          position: "absolute",
          left: 50,
          top: 50,
          height: 500,
          width: 1000
        }}
        onMouseLeave={() => {
          setPaintWithState(null);
        }}
      >
        <ColorMapAreas
          readonly={readonly}
          styles={styles}
          onMouseLeave={() => {
            setPaintWithState(null);
          }}
          onMouseDown={(e, fylke) => handleMouseDown(e, fylke)}
          onMouseUp={e => handleMouseUp(e)}
          onMouseOver={(e, fylke) => handleMouseOver(e, fylke)}
          fylker={fylker}
        />
      </div>
      {<Legend states={states} styles={styles} />}
    </div>
  );
};

const Legend = ({ states, styles }) => (
  <div style={{ position: "absolute", display: "inline-block", bottom: 50 }}>
    {states.map(x => (
      <LegendItem
        key={x.key}
        title={x.title}
        fill={styles[x.key].normal.fill}
      />
    ))}
  </div>
);

const LegendItem = ({ title, fill }) => (
  <div style={{ display: "inline-block", marginRight: "10px" }}>
    <span
      style={{
        display: "inline-block",
        borderWidth: "1px",
        borderStyle: "solid",
        width: "16px",
        height: "16px",
        backgroundColor: fill
      }}
    />
    <span
      style={{
        display: "inline-block",
        verticalAlign: "text-bottom"
      }}
    >
      &nbsp;{title}
    </span>
  </div>
);

export default Spredningskart;
