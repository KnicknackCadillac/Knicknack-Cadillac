import React from 'react';
import Chat from './Chat.jsx';

const Chats = props => (
  <div>
    <form onSubmit={ e => props.sendMessage(e) }>
      <input type="text" value={props.currentChat.message} onChange={ e => props.handleMessageChange(e) } />
      <input type="submit" />
    </form>

    { props.chats.map( message => (
      <Chat message={message} key={message.message} />
    )) }

  </div>
);

export default Chats;
