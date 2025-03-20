import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

type State = {
  clockName: string;
  hasClock: boolean;
}

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class App extends React.Component {
  state: State = {
    clockName: 'Clock-0',
    hasClock: true,
  };

  clockHeandler = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({
      hasClock: !this.state.hasClock,
    });

  }

  timerId = 0;

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName()
      });
    }, 3300);

    document.addEventListener('contextmenu', this.clockHeandler);
    document.addEventListener('click', this.clockHeandler);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);

    document.removeEventListener('contextmenu', this.clockHeandler);
    document.removeEventListener('click', this.clockHeandler);
  }



  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock && <Clock name={this.state.clockName} />}
      </div>
    );
  }
};
