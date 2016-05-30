import React from 'react';

export default class Users extends React.Component {
  render () {
    return (
      <div>
        { this.props.data.chats.map( chat => { chat.username }) }
      </div>
    );
  }
}

module.exports.Users = Users;
