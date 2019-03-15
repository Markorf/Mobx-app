import { observable, action, computed } from "mobx";

class Dog {
  @observable id = new Date().getTime();
  @observable name;
  @observable checked = false;

  constructor(dogName) {
    this.name = dogName;
  }
}

class DogStore {
  @observable dogs = [];
  @observable dogsFilter = "";
  @action addDog = dogName => {
    this.dogs.push(new Dog(dogName));
  };
  @action removeDog = dogIndex => {
    console.log(this.dogs);
    this.dogs.splice(dogIndex, 1);
  };
  @action changeCheck = dogId => {
    const dog = this.dogs.find(dog => dog.id === dogId);
    dog.checked = !dog.checked;
  };
  @action removeCheckedDogs = () => {
    const checkedDogs = this.dogs.filter(dog => !dog.checked);
    this.dogs.replace(checkedDogs);
  };
  @computed get dogsLen() {
    return this.dogs.length;
  }
  @computed get filteredDogs() {
    return this.dogs.filter(
      dog =>
        !this.dogsFilter ||
        dog.name.toUpperCase().includes(this.dogsFilter.toUpperCase())
    );
  }
}

export default new DogStore();
