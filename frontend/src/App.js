
import React, { Component } from 'react';
import Main from './components/Main';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigStore } from './redux/ConfigStore';

const store = ConfigStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
