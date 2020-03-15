import PropTypes from "prop-types";
import React from "react";
import { findSectionById, addMissingFields } from "./utils";
import placeholderData from "./placeholderData";
import styles from "./styles";

export default class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node
  };

  static defaultProps = {
    value: placeholderData
  };

  constructor(props) {
    super(props);

    var data = JSON.parse(this.props.value).map(addMissingFields);
    this.state = { data };

    this.saveSection = this.saveSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
  }

  deleteSection(sectionId, parentId) {
    var list = parentId
      ? findSectionById(parentId, this.state.data).children
      : this.state.data;

    list.splice(
      list.findIndex(s => s.id == sectionId),
      1
    );

    this.props.onChange(JSON.stringify(this.state.data, null, 2));
  }

  saveSection(newSection) {
    var oldSection = findSectionById(newSection.id, this.state.data);
    oldSection.title = newSection.title;
    oldSection.text = newSection.text;
    oldSection.children = newSection.children;
    this.props.onChange(JSON.stringify(this.state.data, null, 2));
  }

  render() {
    const { forID, value, onChange, classNameWrapper } = this.props;
    return (
      <div id={forID} className={classNameWrapper}>
        {this.state.data.map(section => (
          <Section
            data={section}
            saveSection={this.saveSection}
            deleteSection={this.deleteSection}
            key={section.id}
          />
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
    this.addChild = this.addChild.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
    this.props.saveSection({
      ...this.props.data,
      title: event.target.value
    });
  }
  handleTextChange(event) {
    this.setState({ text: event.target.value });
    this.props.saveSection({
      ...this.props.data,
      text: event.target.value
    });
  }
  addChild() {
    var newChild = addMissingFields({});
    this.props.saveSection({
      ...this.props.data,
      children: this.props.data.children.concat([newChild])
    });
  }

  render() {
    const { data, parentId, saveSection, deleteSection } = this.props;
    return (
      <div style={styles.section}>
        <input
          style={styles.title}
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          style={styles.text}
          type="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        {/* {data.id} */}
        <div style={styles.childrenBox}>
          {data.children.map(section => (
            <Section
              key={section.id}
              data={section}
              saveSection={saveSection}
              deleteSection={deleteSection}
              parentId={data.id}
            />
          ))}
          <button
            style={styles.deleteButton}
            onClick={() => deleteSection(data.id, parentId)}
          >
            x
          </button>
          <button style={styles.addButton} onClick={this.addChild}>
            +
          </button>
        </div>
      </div>
    );
  }
}
