import React, { useCallback, useState } from "react";
import { render } from "react-dom";
import SvgShapeSelector from "../src/components/SvgShapeSelector";
import Legend from "../src/components/Legend";
import countyListLand from "./countyListLand";
import boundary from "./map";
import categories from "./category";
import DiagonalHatch from "./DiagonalHatch";

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
    <SvgShapeSelector
      readonly={readonly}
      categories={categories}
      boundary={boundary}
      onSwitchCategory={handleSwitchCategory}
      regionDefs={regionDefs}
      states={states}
    >
      <DiagonalHatch />
      <Legend categories={categories} />
    </SvgShapeSelector>
  );
};

render(<Example />, document.querySelector("#mount"));

//export default Spredningskart;
