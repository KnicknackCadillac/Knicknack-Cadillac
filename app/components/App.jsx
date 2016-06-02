import React from 'react';
import ReactDOM from 'react-dom';
import Users from './Users.jsx';
import Chats from './Chats.jsx';
import Chart from './PieChart.jsx';
// : delete dummy data after connecting db
import messagesData from '../data/dummydata.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [
        {
          username: 'someUserName',
          message: 'some message yeah',
          tone: [
            {
              score: 0.028428,
              tone_id: 'anger'
            },
            {
              score: 0.00693,
              tone_id: 'disgust'
            },
            {
              score: 0.034893,
              tone_id: 'fear'
            },
            {
              score: 0.995658,
              tone_id: 'joy'
            },
            {
              score: 0.048616,
              tone_id: 'sadness'
            },
          ]
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

  handleChange(e) {
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
        console.log('Successfully posted message', data);
      }
    });
    this.setState({
      chat: {
        message: ''
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <Chart />
        </div>
        <div className="col-md-6">
          <Users chats={ this.state.chats } click={ user => this.selectUser(user) } />
        </div>
        <div className="col-md-6">
          <Chats
            chats={ this.state.chats }
            sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleChange(event) }
            currentChat={this.state.chat} />
        </div>
      </div>
    );
  }
}

// TODO: replace 'messagesData' with fetched data
ReactDOM.render(<App props={ messagesData } />, document.getElementById('app'));
