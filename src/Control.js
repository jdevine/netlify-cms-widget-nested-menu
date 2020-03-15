import PropTypes from "prop-types";
import React from "react";

const placeHolderData = `[{"title": "Grandparent 1","text": "Grandparent 1 description.","children": [{"title": "Parent 1","children": []},
  {"title": "Parent 2","children": [{"title": "First Child","text": "I am the first child","children": []},
  {"title": "Second Child","text": "I am the second child","children": []}]}]},{"title": "Grandparent 2","text":
  "Grandparent 2 description.","children": [{"title": "Parent 3","children": [{"title": "Third Child","text":
  "I am the third child","children": []},{"title": "Fourth Child","text": "I am the fourth child","children": []}]}]}]`;

export default class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node
  };

  static defaultProps = {
    value: placeHolderData
  };

  constructor(props) {
    super(props);

    var data = JSON.parse(this.props.value).map(addMissingFields);
    this.state = { data };

    this.saveSection = this.saveSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.updateOutput = () =>
      this.props.onChange(
        JSON.stringify(this.state.data, ["title", "text", "children"])
      );
  }

  deleteSection(sectionId, parentId) {
    var list = parentId
      ? findSectionById(parentId, this.state.data).children
      : this.state.data;

    list.splice(
      list.findIndex(s => s.id == sectionId),
      1
    );
    this.updateOutput();
  }

  saveSection(newSection) {
    var oldSection = findSectionById(newSection.id, this.state.data);
    oldSection.title = newSection.title;
    oldSection.text = newSection.text;
    oldSection.children = newSection.children;
    this.updateOutput();
  }

  render() {
    const { forID, value, onChange, classNameWrapper } = this.props;
    return (
      <div
        id={forID}
        className={classNameWrapper}
        style={{ padding: "0.5rem" }}
      >
        {this.state.data.map(section => (
          <Section
            data={section}
            saveSection={this.saveSection}
            deleteSection={this.deleteSection}
            depth={0}
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
    this.colour = styles.sectionColours[this.props.depth] || "white";
    this.descriptionHeight = Math.max(2, this.props.data.text.length / 40);

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
    const { data, parentId, depth, saveSection, deleteSection } = this.props;
    return (
      <div
        style={{
          ...styles.section,
          background: this.colour
        }}
      >
        <input
          style={{
            ...styles.title,
            background: this.colour
          }}
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
        {/* {data.id} */}
        <div style={styles.childrenBox}>
          {data.children.map(section => (
            <Section
              key={section.id}
              data={section}
              saveSection={saveSection}
              deleteSection={deleteSection}
              parentId={data.id}
              depth={depth + 1}
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

const styles = {
  section: {
    margin: "0 auto 0.5rem auto",
    background: "white",
    border: "2px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.5rem 0 0.5rem 0"
  },
  sectionColours: [
    "#ff5555",
    "#ff7755",
    "#fff055",
    "#99cc33",
    "#5699ff",
    "#cc99ff"
  ],
  title: {
    display: "block",
    width: "100%",
    height: "1.5rem",
    padding: "0.2rem",
    border: "none",
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "400",
    background: "grey"
  },
  text: {
    display: "block",
    width: "90%",
    height: "2rem",
    padding: "0.2rem",
    border: "none",
    margin: "0.5rem",
    fontSize: "1rem",
    resize: "vertical",
    opacity: "0.9"
  },
  childrenBox: {
    width: "98%"
  },
  addButton: {
    border: "none",
    backgroundColor: "transparent",
    width: "90%",
    textAlign: "right"
  },
  deleteButton: {
    border: "none",
    color: "#e22",
    backgroundColor: "transparent",
    width: "1.5rem"
  }
};

const addMissingFields = section => {
  section.id =
    section.id ||
    Math.random()
      .toString(36)
      .substr(2, 9);
  section.text = section.text || "";
  section.children = section.children || [];
  if (section.children) section.children.map(addMissingFields);
  return section;
};

const findSectionById = (id, list) => {
  for (const section of list) {
    if (section.id === id) return section;
    if (!section.children) continue;
    const found = findSectionById(id, section.children);
    if (found) return found;
  }
  return undefined;
};
