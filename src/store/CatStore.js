import { observable, action, computed } from "mobx";

class CatStore {
  @observable cats = [];
  @action addCat = newCat => {
    this.dogs.push(newCat);
  };
  @action removeCat = catIndex => {
    this.dogs.splice(catIndex, 1);
  };
  @computed get catsLen() {
    return this.cats.length;
  }
}

export default new CatStore();
