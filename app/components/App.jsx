var update = require('react-addons-update');
import React from 'react';
import ReactDOM from 'react-dom';
// import Users from './Users.jsx';
import Chats from './Chats.jsx';
import Chart from './PieChart.jsx';
import BarChart from './BarChart.jsx';
import Treemap from './Treemap.jsx';
// TODO: delete dummy data after connecting db
import messagesData from '../data/dummydata.js';

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
        watsonData:
        [
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
        ],
        circleAttributes: {
          title: 'Emotional Tone',
          width: null,
          height: 2,
          radius: 4,
          innerRadius: 4
        }
      },

      language_tone:{
        watsonData:
        [
          {
            x: 'Analytical',
            y: 1
          },
          {
            x: 'Confident',
            y: 1
          },
          {
            x: 'Tentative',
            y: 1
          },
        ],
        circleAttributes: {
          // title: 'Language Tone',
          // width: null,
          // height: 3,
          // radius: 5.1,
          // innerRadius: 4.1
        }
      },
      social_tone:{
        watsonData:
        [
          {
            label: 'Openness',
            value: 1
          },
          {
            label: 'Conscientiousness',
            value: 1
          },
          {
            label: 'Extraversion',
            value: 1
          },
          {
            label: 'Agreeableness',
            value: 1
          },
          {
            label: 'Emotional Range',
            value: 1
          },
        ],
        circleAttributes: {
          title: 'Social Tone',
          width: null,
          height: 2.2,
          radius: 8.2,
          innerRadius: 4.2

        }

      }
    };
    this.handlePieClick = this.handlePieClick.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.handleTreeClick = this.handleTreeClick.bind(this);
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



        // update(this.state.emotion_tone,
        //     watsonData: {$push: emotion_Arr}
        // );
        // update(this.state.language_tone, {
        //   language_tone: {
        //     watsonData: {$push: language_Arr}
        //   }
        // });
        // update(this.state.social_tone, {
        //   social_tone: {
        //     watsonData: {$push: social_Arr}
        //   }
        // });


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

        console.log(emotion_Arr);
        console.log(language_Arr);
        console.log(social_Arr);
      }
    });
  }
          // { this.state.emotionClicked ? <Chart pieData={ this.state.emotion_tone } /> : null }
          // { this.state.languageClicked ? <Chart pieData={ this.state.language_tone } /> : null }
          // { this.state.socialClicked ? <Chart pieData={ this.state.social_tone } /> : null }

  render() {
    if(this.state.emotionClicked){
      return (
        <div>
          <div className='chart'>
            <form className='input'>
              <Chats
              sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleChange(event) }
              currentChat={ this.state.chat } />
            </form>
            <div onClick={this.handlePieClick} className='large'>
              <Chart pieData={ this.state.emotion_tone } clicked={this.state.emotionClicked}/>
            </div>
            <div onClick={this.handleBarClick} className='shrink'>
              <BarChart barChartData={ this.state.language_tone } clicked={this.state.languageClicked}/>
            </div>
            <div onClick={this.handleTreeClick} className='shrink'>
              <Treemap treemapData={ this.state.social_tone } clicked={this.state.socialClicked}/>
            </div>
          </div>

          <div className="col-md-6">
          </div>
        </div>
      );
    } else if (this.state.languageClicked) {
      return (
        <div>
          <div className='chart'>
            <form className='input'>
              <Chats
              sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleChange(event) }
              currentChat={ this.state.chat } />
            </form>
            <div onClick={this.handleBarClick} className='large'>
              <BarChart barChartData={ this.state.language_tone } clicked={this.state.languageClicked}/>
            </div>
            <div onClick={this.handlePieClick} className='shrink' >
              <Chart pieData={ this.state.emotion_tone } clicked={this.state.emotionClicked}/>
            </div>
            <div onClick={this.handleTreeClick} className='shrink'>
              <Treemap treemapData={ this.state.social_tone } clicked={this.state.socialClicked}/>
            </div>
          </div>

          <div className="col-md-6">
          </div>
        </div>
      );
    } else if (this.state.socialClicked) {
      return (
        <div>
          <div className='chart'>
            <form className='input'>
              <Chats
              sendMessage={ event => this.handleSubmit(event) } handleMessageChange={ event => this.handleChange(event) }
              currentChat={ this.state.chat } />
            </form>
            <div onClick={this.handleTreeClick} className='large'>
              <Treemap treemapData={ this.state.social_tone } clicked={this.state.socialClicked}/>
            </div>
            <div onClick={this.handlePieClick} className='shrink'>
              <Chart pieData={ this.state.emotion_tone } clicked={this.state.emotionClicked}/>
            </div>
            <div onClick={this.handleBarClick} className='shrink'>
              <BarChart barChartData={ this.state.language_tone } clicked={this.state.languageClicked}/>
            </div>
          </div>

          <div className="col-md-6">
          </div>
        </div>
      );
    }
  }
}

// TODO: replace 'messagesData' with fetched data
  ReactDOM.render(<App props={ messagesData } />, document.getElementById('app'));
