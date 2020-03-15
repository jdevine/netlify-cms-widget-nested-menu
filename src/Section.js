import React from "react";
import styles from "./styles";
import SectionList from "./SectionList";

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: props.data.title, text: props.data.text };
    this.colour = styles.sectionColours[this.props.depth] || "white";
    this.descriptionHeight = Math.max(2, this.props.data.text.length / 40);
    this.delete = () =>
      this.props.callbacks.del(this.props.data.id, this.props.parentId);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
    this.props.callbacks.save({
      ...this.props.data,
      title: event.target.value
    });
  }
  handleTextChange(event) {
    this.setState({ text: event.target.value });
    this.props.callbacks.save({
      ...this.props.data,
      text: event.target.value
    });
  }

  render() {
    return (
      <div style={{ ...styles.section, background: this.colour }}>
        <input
          style={{ ...styles.title, background: this.colour }}
          type="text"
          placeholder="Section Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          style={{ ...styles.text, height: this.descriptionHeight + "rem" }}
          placeholder="Section Description"
          type="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <SectionList
          sections={this.props.data.children}
          parentId={this.props.data.id}
          depth={this.props.depth + 1}
          callbacks={this.props.callbacks}
        />

        <button style={styles.deleteButton} onClick={this.delete}>
          x
        </button>
      </div>
    );
  }
}
