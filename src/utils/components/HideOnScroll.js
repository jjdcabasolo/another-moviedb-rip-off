import React from 'react';

import {
  Slide,
  useScrollTrigger,
} from '@material-ui/core';

const HideOnScroll = ({ children, window, replacement }) => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
      <Slide appear={false} direction="down" in={trigger}>
        {replacement}
      </Slide>
    </>
  );
};

export default HideOnScroll;
