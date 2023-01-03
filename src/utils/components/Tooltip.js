import React from "react";
import PropTypes from "prop-types";

import { Tooltip as MuiTooltip } from "@material-ui/core";

const Tooltip = ({ children, placement, title, visible }) =>
  visible ? (
    <MuiTooltip title={title} placement={placement}>
      {children}
    </MuiTooltip>
  ) : (
    children
  );

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Tooltip;
