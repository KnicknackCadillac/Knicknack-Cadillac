import React from 'react';
import Chat from './Chat.jsx';

const Chats = props => (
  <div>
    { props.chats.map( message => (
      <Chat message={message} key={message.message} />
    )) }
  </div>
);

export default Chats;
