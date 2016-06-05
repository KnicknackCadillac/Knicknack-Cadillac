require('./testdom.js')('<html><body></body></html>');

import 'babel-polyfill';

// Create a fake global `window` and `document` object:
var jsdom = require('./testdom.js');

// Replace Chat.js with a stub component.
global.reactModulesToStub = [
  // 'Chat.js'
];

var assert = require('assert');

describe('App component', function() {
  jsdom('<html><body></body></html>');
  // jsdom();

  it('changes the text after click', function() {
    var React = require('react/addons');
    var Chat = require('../app/components/Chat.jsx');
    var TestUtils = React.addons.TestUtils;

    var testData = {

    };

    // Render a checkbox with label in the document
    var appComponent = TestUtils.renderIntoDocument(
      <App props={ testData } />
    );

    // Verify default message
    var appEl = TestUtils.findRenderedDOMComponentWithTag(
      appComponent, 'div');
    assert.equal(appEl.getDOMNode().textContent, 'Chat component test');

    // Simulate a change in message and verify
    // appComponent
    TestUtils.Simulate.change(appEl);
    assert.equal(appEl.getDOMNode().textContent, 'Different message');
  });
});
