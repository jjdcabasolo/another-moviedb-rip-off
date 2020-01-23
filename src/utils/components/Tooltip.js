import React from 'react';

import { Tooltip as MuiTooltip } from '@material-ui/core';

const Tooltip = ({ children, title, placement, visible }) =>
  visible
    ? (
      <MuiTooltip title={title} placement={placement}>
        {children}
      </MuiTooltip>
    )
    : children;

export default Tooltip;
