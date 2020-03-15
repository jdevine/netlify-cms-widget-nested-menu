import React from "react";
import Section from "./Section";
import styles from "./styles";

export default class SectionList extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.sections.map(section => (
          <Section
            key={section.id}
            data={section}
            parentId={this.props.parentId}
            depth={this.props.depth}
            callbacks={this.props.callbacks}
          />
        ))}
        <button
          style={styles.addButton}
          onClick={() => this.props.callbacks.add(this.props.parentId)}
        >
          +
        </button>
      </React.Fragment>
    );
  }
}
