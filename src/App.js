import React from "react";
import ColorMapAreas from "./components/ColorMapAreas";
import countyListLand from "./countyListLand";

export default class Spredningskart extends React.Component {
  render() {
    const styles = {
      none: {
        normal: {
          stroke: "#777",
          fill: "#ffffd4"
        },
        highlight: {
          stroke: "#000",
          fill: "#cc4c02"
        }
      },
      potential: {
        normal: {
          stroke: "#777",
          fill: "#fed98e"
        },
        highlight: {
          stroke: "#000",
          fill: "#ffffd4"
        }
      },
      assumed: {
        normal: {
          stroke: "#555",
          fill: "#fe9929"
        },
        highlight: {
          stroke: "#000",
          fill: "#ffffd4"
        }
      },
      known: {
        normal: {
          stroke: "#555",
          fill: "#cc4c02"
        },
        highlight: {
          stroke: "#000",
          fill: "#fe9929"
        }
      }
    };

    const states = [
      {
        key: "none",
        title: "labels.distributionNone"
      },
      {
        key: "known",
        title: "labels.distributionKnown",
        values: "vurdering.knownRegionalPresence"
      },
      {
        key: "assumed",
        title: "labels.distributionAssumed",
        values: "vurdering.assumedRegionalPresence"
      }
    ];
    const fylkerArray = countyListLand.map(fylke => {
      const active = Spredningskart.getCurrentState(fylke.Value, states);
      console.log(active);
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
            border: "1px solid blue",
            position: "absolute",
            left: 50,
            top: 50,
            height: 200,
            width: 300
          }}
          onMouseLeave={() => {
            this.paintWithState = null;
          }}
        >
          <ColorMapAreas
            readonly={this.props.readonly}
            styles={styles}
            onMouseLeave={() => {
              this.paintWithState = null;
            }}
            onMouseDown={(e, fylke) => this.handleMouseDown(e, fylke)}
            onMouseUp={e => this.handleMouseUp(e)}
            onMouseOver={(e, fylke) => this.handleMouseOver(e, fylke)}
            fylker={fylker}
          />
        </div>
        {<Legend states={states} styles={styles} />}
      </div>
    );
  }

  static getCurrentState(fylke, states) {
    let defaultState = null;
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      if (!state.values) defaultState = state;
      else if (state.values[fylke]) return state;
    }
    return defaultState;
  }
  getNextState(curState) {
    const currentIndex = this.getStateIndex(curState.key);
    return (currentIndex + 1) % this.props.states.length;
  }
  getStateIndex(key) {
    const states = this.props.states;
    for (let i = 0; i < states.length; i++) if (key === states[i].key) return i;

    throw new Error(`Unknown map state ${key}`);
  }

  handleMouseOver(e, fylke) {
    e.stopPropagation();
    if (this.paintWithState == null) return;
    this.check(fylke, this.paintWithState);
  }
  handleMouseUp(e) {
    e.stopPropagation();
    this.paintWithState = null;
  }
  handleMouseDown(e, fylke) {
    e.stopPropagation();
    const states = this.props.states;
    const curState = Spredningskart.getCurrentState(fylke, states);
    this.paintWithState = this.getNextState(curState);
    this.check(fylke, this.paintWithState);
  }
  check(fylke, state) {
    const states = this.props.states;
    for (let i = 0; i < states.length; i++)
      if (states[i].values) states[i].values[fylke] = state === i;
  }
}

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
