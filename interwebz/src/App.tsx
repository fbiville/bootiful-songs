import * as React from 'react';
import './App.css';
import './styles.css';
import './video/Video.css';
import banana from './assets/img/banana.gif';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
          <h1>Welcome to 👢iful songs!</h1>
          <div className="videoContainer">
              <img className="dancing-banana" src={banana} alt="Dancing banana"/>
              <img className="dancing-banana" src={banana} alt="Dancing banana"/>
          </div>
      </div>
    );
  }
}

export default App;
