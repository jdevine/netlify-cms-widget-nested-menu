import PropTypes from "prop-types";
import React from "react";
var placeholderData = require("./placeholderData");
var utils = require("./utils");

export default class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node
  };

  static defaultProps = {
    value: placeholderData.string
  };

  constructor(props) {
    super(props);
    var data = JSON.parse(this.props.value).map(utils.addMissingFields);
    this.state = { data };
  }

  render() {
    const { forID, value, onChange, classNameWrapper } = this.props;
    return (
      <div id={forID} className={classNameWrapper}>
        {this.state.data.map(section => (
          <Section data={section} key={section.id} />
        ))}
      </div>
    );
  }
}

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: props.data.title, text: props.data.text };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  styles = {
    section: {
      margin: "0 auto 0.5rem auto",
      backgroundColor: "white",
      border: "2px solid black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "1rem",
      maxWidth: "60rem"
    },
    title: {
      display: "block",
      width: "100%",
      height: "1.5rem",
      padding: "0.2rem",
      border: "none",
      textAlign: "center",
      fontSize: "1.2rem",
      fontWeight: "400",
      backgroundColor: "grey"
    },
    text: {
      display: "block",
      width: "90%",
      height: "2rem",
      padding: "0.2rem",
      border: "none",
      margin: "0.5rem",
      fontSize: "1rem",
      resize: "vertical"
    },
    childrenBox: {
      width: "90%",
      backgroundColor: "grey",
      padding: "0.5rem"
    }
  };

  render() {
    return (
      <div style={this.styles.section}>
        <input
          style={this.styles.title}
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          style={this.styles.text}
          type="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        {/* {this.props.data.id} */}
        {}
        <div style={this.styles.childrenBox}>
          {this.props.data.children.map(section => (
            <Section data={section} key={section.id} />
          ))}
        </div>
      </div>
    );
  }
}
