import React from 'react';

const Users = ({ data }) => (
  <div>
    { data.map( chat => { chat.username }) }
  </div>
);

export default Users;
