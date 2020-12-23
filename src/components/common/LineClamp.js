import React from 'react';

import ClampLines from 'react-clamp-lines';

import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const ReadMoreButton = styled(Button)(({
  theme,
}) => ({
  width: '100%',
  marginTop: '8px !important',
  color: theme.palette.text.secondary,
}));

export default class LineClamp extends ClampLines {
  getButton() {
    if (this.state.noClamp || !this.props.buttons) return null;

    const buttonText = this.watch ? this.props.moreText : this.props.lessText;

    return (
      <ReadMoreButton
        aria-controls={`clamped-content-${this.uuid}`}
        aria-expanded={!this.state.expanded}
        className="line-clamp-button"
        onClick={this.clickHandler}
        size="small"
      >
        {buttonText}
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
