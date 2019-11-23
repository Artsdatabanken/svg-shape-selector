import React, { useCallback, useState } from "react";
import ColorMapAreas from "../components/ColorMapAreas";
import countyListLand from "./countyListLand";
import boundary from "./map";
import Legend from "../Legend";
import categories from "./category";

const Spredningskart = ({ readonly }) => {
  const [states, setStates] = useState({});

  const handleSwitchCategory = useCallback(
    (e, fylke, state) => {
      states[fylke] = state;
      setStates(states);
    },
    [states]
  );

  const regionDefs = countyListLand.map(fylke => {
    const curState = states[fylke] || 0;
    const state = categories[curState];
    return {
      kode: fylke.Value,
      title: `${fylke.Text}: ${state.title}`,
      style: state
    };
  });
  console.log(regionDefs);

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
          onSwitchCategory={handleSwitchCategory}
          regionDefs={regionDefs}
          states={states}
        />
      </div>
      {<Legend categories={categories} />}
    </div>
  );
};

export default Spredningskart;
