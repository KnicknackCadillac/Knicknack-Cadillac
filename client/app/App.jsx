class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Users />
      <Chat />
    );
  }
}

ReactDOM.render(<App data={messageData}/>, document.getElementById('app'));

var messagesData =
[
  {
    username: 'Bob',
    message: 'hello'
  },
  {
    username: 'Bob',
    message: 'hello'
  },
  {
    username: 'Bob',
    message: 'hello'
  },
  {
    username: 'Bob',
    message: 'hello'
  },
  {
    username: 'Bob',
    message: 'hello'
  },
];
