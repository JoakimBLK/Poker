
export default class Card {

  _name = "";
  _color = "";
  _value = 0;

  constructor(name, color, value) {

    this._name = name;
    this._color = color;
    this._value = value;

  }

  isAce() {

    bIsAce = false;

    if (this._name.toLowerCase() == "ace" && this._value == 1) {
      bIsAce = true;
    }
    return bIsAce;
  }

}
