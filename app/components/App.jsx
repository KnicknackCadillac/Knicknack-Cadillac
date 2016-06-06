var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var update = require('react-addons-update');
var _ = require('underscore')
import React from 'react';
import ReactDOM from 'react-dom';
// import Users from './Users.jsx';
import Chats from './Chats.jsx';
import Chart from './PieChart.jsx';
import BarChart from './BarChart.jsx';
import Treemap from './Treemap.jsx';
import initialData from '../data/initialData.js';
import wallpaper from '../data/wallpaperdata.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionClicked: true,
      languageClicked: false,
      socialClicked: false,
      chat: {
        // username: 'boo',
        inputText: '',
        message: ''
      },
      emotion_tone: {
        watsonData: [],
        circleAttributes: {}
      },
      language_tone:{
        watsonData: [],
        circleAttributes: {}
      },
      social_tone:{
        watsonData: [],
        circleAttributes: {}
      },
      styles: {
        emotions: {
        backgroundImage: ''
      },
        social: {
          backgroundImage: ''
        },
        language: {
          backgroundImage: ''
        }
      }
    };

    this.handlePieClick = this.handlePieClick.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.handleTreeClick = this.handleTreeClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      emotion_tone: initialData[0].emotion_tone,
      language_tone: initialData[0].language_tone,
      social_tone: initialData[0].social_tone,
    });
  }

  //handle clicks
  handlePieClick() {
    console.log('handle pie used');
    this.state.emotionClicked ? true : this.setState({
      emotionClicked: true,

    });
    this.state.languageClicked ? this.setState({languageClicked: false}) : false;
    this.state.socialClicked ? this.setState({socialClicked: false}) : false;
  };
  handleBarClick() {
    console.log('handle bar used')
    this.state.emotionClicked ? this.setState({emotionClicked: false}) : false;
    this.state.languageClicked ? true : this.setState({languageClicked: true});
    this.state.socialClicked ? this.setState({socialClicked: false}) : false;
  };
  handleTreeClick() {
    console.log('handle tree used');
    this.state.emotionClicked ? this.setState({emotionClicked: false}) : false;
    this.state.languageClicked ? this.setState({languageClicked: false}) : false;
    this.state.socialClicked ? true : this.setState({socialClicked: true});
  };

  handleChange(e) {
    this.setState({
      chat: {
        inputText: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      chat: {
        message: this.state.chat.inputText
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
        let emotion_Arr = [];
        let language_Arr = [];
        let social_Arr = []

        // populate emotion property
        for (let watsonData of data.tone_categories[0].tones) {
          const obj = {
            label: watsonData.tone_name,
            value: Math.floor(watsonData.score * 100)
          }
          emotion_Arr.push(obj);
        }


        // populate language property
        for (let watsonData of data.tone_categories[1].tones) {
          const obj = {
            x: watsonData.tone_name,
            y: Math.floor(watsonData.score * 100)
          }
          language_Arr.push(obj);
        }


        // populate social property
        for (let watsonData of data.tone_categories[2].tones) {
          const obj = {
            label: watsonData.tone_name,
            value: Math.floor(watsonData.score * 100)
          }
          social_Arr.push(obj);
        }

        this.setState({
          emotion_tone: update(this.state.emotion_tone, {
            watsonData: {$set: emotion_Arr}
            }),
          language_tone: update(this.state.language_tone, {
            watsonData: {$set: language_Arr}
            }),
          social_tone: update(this.state.social_tone, {
            watsonData: {$set: social_Arr}
            })
        });

        var highestEmote = this.state.emotion_tone.watsonData.reduce(function(lastEmote, currEmote) {
          if (lastEmote.value < currEmote.value) {
            return currEmote;
          } else {
            return lastEmote;
          }
        });
        var highestSocial = this.state.social_tone.watsonData.reduce(function(lastEmote, currEmote) {
          if (lastEmote.value < currEmote.value) {
            return currEmote;
          } else {
            return lastEmote;
          }
        });
        var highestLang = this.state.language_tone.watsonData.reduce(function(lastEmote, currEmote) {
          console.log('lastEmote', lastEmote);
          console.log('currEmote', currEmote);
            if (lastEmote === undefined ) {
              lastEmote.y = 1;
            }
            if (currEmote === undefined ) {
              currEmote.y = 1;
            }
          if (lastEmote.y <= currEmote.y) {

            return currEmote;
          } else {
            return lastEmote;
          }
        });
        console.log(highestLang.x);

        this.setState({
          styles: {
            emotions: {
            backgroundImage: 'url(' + wallpaper.emotions[highestEmote.label] + ')',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1',
            position: 'absolute'
          },
            social: {
            backgroundImage: 'url(' + wallpaper.social[highestSocial.label] + ')',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1',
            position: 'absolute'
          },
            language: {
              backgroundImage: 'url(' + wallpaper.language[highestLang.x] + ')',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: '1',
              position: 'absolute'
            }
          }
        })

        console.log(this.state.styles.emotions);
      }
    });
  }

  render() {
    //console.log('this is language_tone.watsondata: ', this.state.language_tone.watsonData);
    var checkBar = _.every(this.state.language_tone.watsonData, function(num) { return num.y === 0;  })
    var bar = <BarChart barChartData={ this.state.language_tone } clicked={this.state.languageClicked}/>
    if(checkBar){
      bar = null
    }

    if(this.state.emotionClicked){
      return (
        <div>
          <div className='chart' style={this.state.styles.emotions}>
            <Chats
              sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleChange(event) }
              currentChat={ this.state.chat } />
            <ReactCSSTransitionGroup transitionName="pie" transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppear={true} transitionAppearTimeout={500}>
              <div onClick={this.handlePieClick} className='large' >
                <Chart pieData={ this.state.emotion_tone } clicked={this.state.emotionClicked}/>
              </div>
              <div onClick={this.handleBarClick} className='shrink1'>
                {bar}
              </div>
              <div onClick={this.handleTreeClick} className='shrink2'>
                <Treemap treemapData={ this.state.social_tone } clicked={this.state.socialClicked}/>
              </div>
            </ReactCSSTransitionGroup>
          </div>

        </div>
      );
    } else if (this.state.languageClicked) {
      return (
        <div>
          <div className='chart' style={this.state.styles.language}>
            <Chats
              sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleChange(event) }
              currentChat={ this.state.chat } key={this.state.chat}/>
            <ReactCSSTransitionGroup transitionName="bar" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            <div key={1} onClick={this.handleBarClick} className='large' >
              {bar}
            </div>
            <div key={2} onClick={this.handlePieClick} className='shrink1' >
              <Chart pieData={ this.state.emotion_tone } clicked={this.state.emotionClicked}/>
            </div>
            <div key={3} onClick={this.handleTreeClick} className='shrink2'>
              <Treemap treemapData={ this.state.social_tone } clicked={this.state.socialClicked}/>
            </div>
            </ReactCSSTransitionGroup>
          </div>
        </div>
      );
    } else if (this.state.socialClicked) {
      return (
        <div>
          <div className='chart' style={this.state.styles.social}>
            <div>
            <Chats
              sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleChange(event) }
              currentChat={ this.state.chat } />
            </div>
            <ReactCSSTransitionGroup transitionName="tree" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
              <div key={1} onClick={this.handleTreeClick} className='large' >
                <Treemap treemapData={ this.state.social_tone } clicked={this.state.socialClicked}/>
              </div>
              <div key={2} onClick={this.handlePieClick} className='shrink1'>
                <Chart pieData={ this.state.emotion_tone } clicked={this.state.emotionClicked}/>
              </div>
              <div key={3} onClick={this.handleBarClick} className='shrink2'>
                {bar}
              </div>
            </ReactCSSTransitionGroup>
          </div>
        </div>
      );
    }
  }
}
ReactDOM.render(<App props={ initialData[0] } />, document.getElementById('app'));
// TODO: replace 'messagesData' with fetched data
