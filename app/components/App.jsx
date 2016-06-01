import React from 'react';
import ReactDOM from 'react-dom';
import Users from './Users.jsx';
import Chats from './Chats.jsx';
// import test from './test.jsx';
import messagesData from '../data/dummydata.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats:[
        {
          username: 'someUserName',
          message: 'some message yeah'
        }
      ],
      chat: {
        username: 'boo',
        message: ''
      }
    };
  }

  getAllMessages(callback) {
    $.ajax({
      type: 'GET',
      url: '/messages',
      contentType: 'application/json',
      success: function(data) {
        callback(data);
      },
      error: function(err) {
        console.log('Error fetching results: ', err);
      }
    });
  }

  componentDidMount() {
    this.getAllMessages(items => {
      this.setState({
        chats: items
      });
    });
  }

  selectUser(user) {
    console.log(user.message);
  }

  handleMessageChange(e) {
    this.setState({
      chat: {
        username: 'boo',
        message: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/messages',
      data: {
        username: this.state.chat.username,
        message: this.state.chat.message
      },
      success: function(data) {
        console.log('Successfully posted message');
      }
    });
    this.setState({
      chat: {message: ''}
    });
  }

  render() {
    return (
      <div>
        <div>
          {/*<test test={ this.state.chats } />*/}
        </div>
        <div className="col-md-6">
          <Users chats={ this.state.chats } click={ user => this.selectUser(user) } />
        </div>
        <div className="col-md-6">
          <Chats
            chats={ this.state.chats }
            sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleMessageChange(event) }
            currentChat={this.state.chat} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App props={ messagesData } />, document.getElementById('app'));
