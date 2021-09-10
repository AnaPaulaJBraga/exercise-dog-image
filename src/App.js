import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };

    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { data } = this.state;
    localStorage.setItem('dogURL', data.message);
    const raçaDog = data.message.split('/')[4];
    alert(`A raça do doguinho é ${raçaDog}`);
  }

  async fetchDog() {
    const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random');
    const requestObject = await requestReturn.json();
    this.setState({
      data: requestObject,
    });
  }

  render() {
    const { data } = this.state;
    if (data === '') return 'loading...';
    return (
      <div>
        <p> Doguinhos</p>

        <button
          type="submit"
          onClick={ this.fetchDog }
        >
          Novo doguinho
        </button>
        <div>
          <img src={ data.message } alt="random dog" />
        </div>
      </div>
    );
  }
}

export default App;
