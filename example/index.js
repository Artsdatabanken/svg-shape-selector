import React, { useCallback, useState } from "react";
import { render } from "react-dom";
import SvgShapeSelector from "../src/components/SvgShapeSelector";
import Legend from "../src/components/Legend";
import countyListLand from "./countyListLand";
import boundary from "./map";
import categories from "./category";

const Example = ({ readonly }) => {
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
        <SvgShapeSelector
          readonly={readonly}
          categories={categories}
          boundary={boundary}
          onSwitchCategory={handleSwitchCategory}
          regionDefs={regionDefs}
          states={states}
        >
          <Legend categories={categories} />
        </SvgShapeSelector>
      </div>
    </div>
  );
};

render(<Example />, document.querySelector("#mount"));

//export default Spredningskart;
