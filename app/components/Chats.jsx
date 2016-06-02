import React from 'react';
import Chat from './Chat.jsx';

const Chats = props => (
  <div>
    <form onSubmit={ e => props.sendMessage(e) }>
      <input type="text" value={props.currentChat.inputText} onChange={ e => props.handleMessageChange(e) } />
      <input type="submit" />
    </form>

    <Chat message={props.currentChat.message} />
    
  </div>
);

export default Chats;
