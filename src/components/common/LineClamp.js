import React from 'react';

import ClampLines from 'react-clamp-lines';

import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

const ReadMoreButton = styled(Button)(({
  theme,
}) => ({
  marginTop: '8px !important',
  width: '100%',
  color: theme.palette.text.secondary,
  zIndex: 1,
}));

export default class LineClamp extends ClampLines {
  getButton() {
    if (this.state.noClamp || !this.props.buttons) return null;

    return (
      <ReadMoreButton
        aria-controls={`clamped-content-${this.uuid}`}
        aria-expanded={!this.state.expanded}
        className="line-clamp-button"
        onClick={this.clickHandler}
        size="small"
      >
        {this.watch ? <KeyboardArrowDown /> : <KeyboardArrowUp /> }
      </ReadMoreButton>
    );
  }

  render() {
    if (!this.props.text) return null;

    const innerClampElement = React.createElement(this.props.innerElement, {
      ref: (e) => {
        this.element = e;
      },
      id: `clamped-content-${this.uuid}`,
      'aria-hidden': this.state.expanded,
    }, this.state.text);

    return (
      <div className={this.getClassName()}>
        {innerClampElement}
        {this.getButton()}
      </div>
    );
  }
}
