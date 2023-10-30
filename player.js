

// create require for ESM-module projects
import Module from "node:module";
const require = Module.createRequire(import.meta.url);

// use require
const prompt = require('prompt-sync')({ sigint: true });


export default class Player {

  _cardsOnHand = [];
  _valueOnHand = 0;
  _name = "";

  constructor(name) {
    this._name = name;
  }

  isCorrectIndata(number) {

    let bOK = true;

    if ((number <= 0 || number >= 6)) {
      return false;
    }

    return bOK;

  }

  getNrOfCardsOnHand() {
    return _cardsOnHand.length;
  }

  compareNumbers(a, b) {
    return a - b;
  }

  getCardsToThrow() {

    let txtnumbers;
    let indexes;
    let number;
    let strInfo;
    let bOK;

    do {

      txtnumbers = [];
      indexes = [];
      number = 0;
      strInfo = "";
      bOK = true;

      strInfo = prompt("The numbers for the Cards to throw (1-5), separate" +
        " with komma (or empty string if none)? ");
      txtnumbers = strInfo.split(",");
      let n1 = txtnumbers.length;

      if (n1 <= 0) {
        bOK = true;
        return indexes;
      }
      else {

        let index = 0;
        for (let i = 0; i < n1; i++) {

          number = parseInt(txtnumbers[i]);

          if (this.isCorrectIndata(number) && !indexes.includes(number)) {

            // Create an index for the card vector.
            indexes[index] = number - 1;
            bOK = true;
            index++;

          }
          else if (this.isCorrectIndata(number) && indexes.includes(number)) {
            bOK = true;
          }
          else {
            bOK = false;
            break;
          }
        }

      }

    } while (!bOK);

    indexes = indexes.sort(this.compareNumbers);
    indexes = indexes.reverse();

    return indexes;

  }

  getTotalValueOnHand() {

    let sum = 0;
    let value1 = 0;
    let n1 = this._cardsOnHand.length;

    for (let i = 0; i < n1; i++) {

      value1 = this._cardsOnHand[i]._value;

      if (value1 == 1) {

        value1 = 14;

      }

      sum = sum + value1;

    }

    return sum;

  }

}
