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
      chats: [],
      message: {
        message: ''
      }
    };
  }

  componentDidMount() {
    this.setState({
      chats: this.props.props
    });
    $.ajax({
      type: 'GET',
      url: '/messages',
      success: function(data) {
        this.setState({
          chat: data
        });
      }
    });
    $.ajax({
      type: 'POST',
      url: '/messages',
      data: {username: 'testuser', message: 'testing message POST'},
      success: function(data) {
        console.log('Successfully posted message');
      }
    });
  }

  selectUser(user) {
    console.log(user.message);
  }

  handleSubmit(e) {
    e.preventDefault();
    /**
    var author = this.state.message.trim();
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
    **/
    // $.ajax({
    //   type: 'GET',
    //   url: '/messages',
    //   success: function(data) {
    //     this.setState({
    //       chat: data
    //     });
    //   }
    // });
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
          <Chats chats={ this.state.chats } />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App props={ messagesData } />, document.getElementById('app'));
