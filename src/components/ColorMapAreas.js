import React from "react";
//import boundary from "./boundary";

export default class ColorMapAreas extends React.Component {
  constructor() {
    super();
    this.state = {
      hoveringOver: null
    };
  }

  static defaultProps = {
    width: "100%",
    height: "100%"
  };

  render() {
    const boundary = this.props.boundary;
    const styles = this.props.styles;
    const readOnly = this.props.readonly;
    const fylker = Object.keys(this.props.fylker).map(kode => {
      const prefs = this.props.fylker[kode];
      const mainStyle = styles[prefs.style];
      let style = mainStyle.normal;
      if (this.state.hoveringOver === kode) style = mainStyle.highlight;
      return (
        <Region
          key={kode}
          kode={kode}
          title={prefs.title}
          boundaryPath={boundary.regions[kode]}
          style={style}
          readonly={readOnly}
          onMouseLeave={e => this.setState({ hoveringOver: null })}
          onMouseOver={e => !readOnly && this.setState({ hoveringOver: kode })}
          onMouseDown={e => !readOnly && this.props.onMouseDown(e, kode)}
          onMouseUp={e => !readOnly && this.props.onMouseUp(e, kode)}
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
        <g>{fylker}</g>
      </svg>
    );
  }
}

const Region = ({
  kode,
  title,
  boundaryPath,
  style,
  readonly,
  onMouseDown,
  onMouseUp,
  onMouseOver,
  onMouseLeave
}) => {
  return (
    <g
      key={kode}
      stroke={style.stroke}
      strokeWidth={style.strokeWidth}
      fill={style.fill}
      style={{ cursor: readonly ? "arrow" : "hand" }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {boundaryPath}
      <title>{title}</title>
    </g>
  );
};

/*
ColorMapAreas.propTypes = {
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  styles: React.PropTypes.object,
  boundary: React.PropTypes.object,
  fylker: React.PropTypes.object
};
*/
