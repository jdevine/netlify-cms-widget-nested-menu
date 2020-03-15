import PropTypes from "prop-types";
import React from "react";

export default function NestedJsonEditorPreview({ value }) {
  return (
    <div>
      <h3>JSON Output:</h3>
      <code>{value}</code>
    </div>
  );
}

NestedJsonEditorPreview.propTypes = {
  value: PropTypes.node
};
