import React from 'react';

const User = props => (
  <div onClick={props.click}>
    {props.user.username}
  </div>
);

export default User;
