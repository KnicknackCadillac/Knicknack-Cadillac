import React from 'react';
import ReactDOM from 'react-dom';
// import Users from './Users.jsx';
import Chats from './Chats.jsx';
import Chart from './PieChart.jsx';
// TODO: delete dummy data after connecting db
import messagesData from '../data/dummydata.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {
        // username: 'boo',
        inputText: '',
        message: '',
        tone: [
          {
            label: 'Anger',
            value: 1
          },
          {
            label: 'Disgust',
            value: 1
          },
          {
            label: 'Fear',
            value: 1
          },
          {
            label: 'Joy',
            value: 1
          },
          {
            label: 'Sadness',
            value: 1
          },
        ]
      }
      // chats: [
      //   {
      //     // username: 'someUserName',
      //     message: 'some message yeah',
      //     tone: [
      //       {
      //         score: 0.028428,
      //         tone_id: 'anger'
      //       },
      //       {
      //         score: 0.00693,
      //         tone_id: 'disgust'
      //       },
      //       {
      //         score: 0.034893,
      //         tone_id: 'fear'
      //       },
      //       {
      //         score: 0.995658,
      //         tone_id: 'joy'
      //       },
      //       {
      //         score: 0.048616,
      //         tone_id: 'sadness'
      //       },
      //     ]
      //   }
      // ],
    };
  }

  // getAllMessages(callback) {
  //   $.ajax({
  //     type: 'GET',
  //     url: '/messages',
  //     contentType: 'application/json',
  //     success: function(data) {
  //       callback(data);
  //     },
  //     error: function(err) {
  //       console.log('Error fetching results: ', err);
  //     }
  //   });
  // }
  //
  // componentDidMount() {
  //   this.getAllMessages(items => {
  //     this.setState({
  //       chats: items
  //     });
  //   });
  // }

  // selectUser(user) {
  //   console.log(user.message);
  // }

  handleChange(e) {
    this.setState({
      chat: {
        // username: 'boo',
        inputText: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      chat: {
        message: this.state.chat.inputText,
      }
    });
    $.ajax({
      type: 'POST',
      url: '/messages',
      data: {
        // username: this.state.chat.username,
        inputText: this.state.chat.inputText
      },
      success: data => {
        const toneArr = [];
        for (let msg of data) {
          const obj = {
            label: msg.tone_name,
            value: Math.floor(msg.score * 100)
          };
          toneArr.push(obj);
        }
        this.setState({
          chat: {
            tone: toneArr
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <Chart pieData={ this.state.chat } />
        </div>

        <div className="col-md-6">
          <Chats
            sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleChange(event) }
            currentChat={ this.state.chat } />
        </div>
      </div>
    );
  }
}

// TODO: replace 'messagesData' with fetched data
ReactDOM.render(<App props={ messagesData } />, document.getElementById('app'));
