import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

class Color extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color : any) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <ChromePicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}
export default Color;