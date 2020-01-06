import React from 'react';

import { Slide, useScrollTrigger } from '@material-ui/core';

const HideOnScroll = ({ children, replacement, willReplace }) => {
  const trigger = useScrollTrigger();

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

export default HideOnScroll;
