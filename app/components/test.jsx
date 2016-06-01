import React from 'react';

const test = props => {
  <form onSubmit={props.handleSubmit}>
    <input type="text" onChange={props.handleMessageChange} />
    <input type="submit" />
  </form>
};

export default test;
