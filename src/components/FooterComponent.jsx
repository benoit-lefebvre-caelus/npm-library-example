import React from "react";
import PropTypes from "prop-types";

/**
 * Footer component to display footer information.
 * @param {*} param0 
 * @returns 
 */
function FooterComponent({customClassName = ""}) {
  return (
    <div className={customClassName}>
      <p>enterprise @2025</p>
    </div>
  );
}
FooterComponent.propTypes = {
  customClassName: PropTypes.string,
};
export default FooterComponent;
