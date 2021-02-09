import React from 'react';
import PropTypes from 'prop-types';

import { Slide, useScrollTrigger } from '@material-ui/core';

const HideOnScroll = ({
  children,
  replacement,
  target,
  willReplace,
}) => {
  const trigger = useScrollTrigger({
    target: target && target.current
      ? target.current
      : undefined,
  });

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
      { willReplace && (
        <Slide appear={false} direction="down" in={trigger}>
          {replacement}
        </Slide>
      )}
    </>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  replacement: PropTypes.node.isRequired,
  willReplace: PropTypes.bool.isRequired,
  target: PropTypes.shape({
    current: PropTypes.node.isRequired,
  }).isRequired,
};

export default HideOnScroll;
