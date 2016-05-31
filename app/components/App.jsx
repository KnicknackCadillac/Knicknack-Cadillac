import React from 'react';
import ReactDOM from 'react-dom';
import Users from './Users.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [
        {
          username: 'bob',
          message: 'hello',
        },
        {
          username: 'bob',
          message: 'hello',
        },
      ]
    };
  }

  // componentDidMount() {
  //   $.ajax({
  //     type: 'GET',
  //     url: '/messages',
  //     success: function(data) {
  //       this.setState({
  //         chat: data
  //       });
  //     }
  //   });
  // }

  selectUser(user) {
    // this.state
  }

  render() {
    return (
      <div>
        <Users data={ this.state.chats } onClick={ this.selectUser.bind(this) } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
