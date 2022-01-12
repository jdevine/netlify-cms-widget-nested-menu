import PropTypes from "prop-types";
import React from "react";
import { addMissingFields, findSection, findSubList } from "./utils";
import SectionList from "./SectionList";
import placeholderData from "./placeholderData";

export default class NestedJsonEditorControl extends React.Component {
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
    this.callbacks = {
      add: this.addSection.bind(this),
      del: this.deleteSection.bind(this),
      moveUp: this.moveSectionUp.bind(this),
      moveDown: this.moveSectionDown.bind(this),
      save: this.saveSection.bind(this)
    };

    this.updateOutput = () =>
      this.props.onChange(
        JSON.stringify(this.state.data, ["title", "text", "children"])
      );
  }

  addSection(parentId) {
    var list = findSubList(parentId, this.state.data);
    list.push(addMissingFields({}));
    this.updateOutput();
  }

  deleteSection(sectionId, parentId) {
    var list = findSubList(parentId, this.state.data);

    list.splice(
      list.findIndex(s => s.id == sectionId),
      1
    );
    this.updateOutput();
  }

  moveSectionUp(sectionId, parentId) {
    this.moveSection(sectionId, parentId, -1);
  }

  moveSectionDown(sectionId, parentId) {
    this.moveSection(sectionId, parentId, 1);
  }

  moveSection(sectionId, parentId, dist){
    var list = findSubList(parentId, this.state.data);
    var currentIndex = list.findIndex(s => s.id == sectionId);
    var targetIndex = currentIndex + dist;

    if (targetIndex < 0 || targetIndex > (list.length - 1)) {
      return;
    }

    list.splice(targetIndex, 0, list.splice(currentIndex,1)[0]);

    this.updateOutput();
  }

  saveSection(newSection) {
    var oldSection = findSection(newSection.id, this.state.data);
    oldSection.title = newSection.title;
    oldSection.text = newSection.text;
    oldSection.children = newSection.children;
    this.updateOutput();
  }

  render() {
    return (
      <div
        id={this.props.forID}
        className={this.props.classNameWrapper}
        style={{ padding: "0.5rem" }}
      >
        <SectionList
          sections={this.state.data}
          parentId={"root"}
          depth={0}
          callbacks={this.callbacks}
        />
      </div>
    );
  }
}
