import React from "react";
import PropTypes from "prop-types";

/**
 * ToolBar component to display toolbar information.
 * @param {*} param0 
 * @returns 
 */
function ToolBarComponent({customClassName = ""}) {
  return (
    <div className={customClassName}>
      <h1>Here is the toolbar</h1>
    </div>
  );
}
ToolBarComponent.propTypes = {
  customClassName: PropTypes.string,
};
export default ToolBarComponent;
