const initialData =
[
  {
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
        height: 1,
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

    },

    social_tone: {
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
  }
];

export default initialData;
