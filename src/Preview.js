import PropTypes from "prop-types";
import React from "react";

export default function Preview({ value }) {
  return (
    <div>
      <h3>JSON Output:</h3>
      <code>{value}</code>
    </div>
  );
}

Preview.propTypes = {
  value: PropTypes.node
};
