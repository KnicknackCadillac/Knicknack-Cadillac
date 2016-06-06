import React from 'react';

const Chats = props => (
  <div className='form-horizontal'>
    <form onSubmit={ e => props.sendMessage(e) }>
      <textarea placeholder='Enter text to be analyzed' value={ props.currentChat.inputText } onChange={ e => props.handleMessageChange(e) } className='form-control' rows='3' />
      <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
    </form>
  </div>
);

export default Chats;
