import React from 'react';

const Chats = props => (
  <div>
    <form onSubmit={ e => props.sendMessage(e) }>
      <textarea value={ props.currentChat.inputText } onChange={ e => props.handleMessageChange(e) } />
      <input type="submit" />
    </form>
  </div>
);

export default Chats;
