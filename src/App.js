import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./App.css";

@inject("DogStore")
@inject("CatStore")
@observer
class App extends Component {
  dogRef = React.createRef();
  addNewDog = e => {
    e.preventDefault();
    const { DogStore } = this.props;
    DogStore.addDog(this.dogRef.current.value);
    e.target.reset();
  };

  renderDogs = () => {
    const { DogStore } = this.props;
    const style = {
      cursor: "pointer",
      fontSize: "1.2rem"
    };

    return (
      <ul>
        {DogStore.filteredDogs.map((dog, index) => (
          <React.Fragment key={dog.id}>
            <li style={style} onClick={() => DogStore.removeDog(index)}>
              {dog.name}
            </li>
            <input
              type="checkbox"
              value={dog.checked}
              checked={dog.checked}
              onChange={() => DogStore.changeCheck(dog.id)}
            />
          </React.Fragment>
        ))}
        <br />
        <button onClick={DogStore.removeCheckedDogs}>
          Remove checked dogs
        </button>
      </ul>
    );
  };

  onFilterDogs = e => {
    const { DogStore } = this.props;
    DogStore.dogsFilter = e.target.value;
  };

  componentDidMount() {
    console.log(this.props.CatStore);
  }

  render() {
    const { DogStore } = this.props;

    return (
      <div className="App">
        <h3>Dogz</h3>
        <div>
          <input
            type="text"
            placeholder="Find dog"
            value={DogStore.dogsFilter}
            onChange={this.onFilterDogs}
          />
        </div>
        <form onSubmit={this.addNewDog}>
          <input ref={this.dogRef} type="text" placeholder="Add new Dog" />
          <button>Add new Dog</button>
        </form>
        <h4>Added dogs {DogStore.dogsLen}:</h4>
        {this.renderDogs()}
      </div>
    );
  }
}

export default App;
