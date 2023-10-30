

// create require for ESM-module projects
import Module from "node:module";
const require = Module.createRequire(import.meta.url);

// use require
const prompt = require('prompt-sync')({ sigint: true });

import Card from "./card.js";
import Player from "./player.js";

let cardColors = ["Spades", "Clubes", "Diamonds", "Hearts"];
let cardTypes = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9",
  "10", "Jack", "Queen", "King"];

export default class Game {

  _players = [];
  _sortedCards = [];
  _unsortedCards = [];
  _thrownCards = [];

  set players(players) {
    this._players = players;
  }

  get players() {
    return this._players;
  }

  constructor() {

  }

  throwCardsForPlayer(index) {

    if (index < 0 || index > this._players.length - 1) {
      return;
    }

    let indexes = this._players[index].getCardsToThrow();
    let n1 = indexes.length;

    if (n1 <= 0) {
      return;
    }

    for (let i = 0; i < n1; i++) {
      let index1 = indexes[i];
      this._thrownCards.push(this._players[index]._cardsOnHand.splice(index1, 1)[0]);
    }

  }

  createSortedCardDeck() {

    let n1 = cardTypes.length;
    let n2 = cardColors.length;
    this._sortedCards = [];
    let index = 0;

    for (let i = 0; i < n1; i++) {

      for (let j = 0; j < n2; j++) {

        this._sortedCards[index] = new Card(cardTypes[i],
          cardColors[j], i + 1);
        index++;

      }

    }

  }

  createShuffledCardDeck() {

    while (this._sortedCards.length > 0) {

      let n1 = this._sortedCards.length;
      let index = this.createRandomNumber(0, n1 - 1);
      this._unsortedCards.push(this._sortedCards.splice(index, 1)[0]);

    }

  }

  addNewPlayer(name) {
    return this._players.push(new Player(name));
  }

  getNrOfPlayers() {

    let nrOfPlayers = 0;
    nrOfPlayers = this._players.length;

    return nrOfPlayers;

  }

  throwAllCards() {

    let nrOfPlayers = this.getNrOfPlayers();
    let n1 = 0;

    for (let iPlayer = 0; iPlayer < nrOfPlayers; iPlayer++) {

      while (this._players[iPlayer]._cardsOnHand.length > 0) {
        this._thrownCards.push(this._players[iPlayer]._cardsOnHand.pop());
      }

    }

  }

  getNewCards() {

    let nrOfPlayers = this.getNrOfPlayers();
    let n1 = 0;


    for (let iPlayer = 0; iPlayer < nrOfPlayers; iPlayer++) {

      n1 = 5 - this._players[iPlayer]._cardsOnHand.length;

      for (let iCard = 0; iCard < n1; iCard++) {

        this._players[iPlayer]._cardsOnHand.push(this._unsortedCards.pop());

      }

    }

  }

  dealFiveCards() {

    let nrOfPlayers = this.getNrOfPlayers();

    for (let iCard = 0; iCard < 5; iCard++) {

      for (let iPlayer = 0; iPlayer < nrOfPlayers; iPlayer++) {

        this._players[iPlayer]._cardsOnHand[iCard] = this._unsortedCards.pop();

      }

    }

  }

  startRound() {

    this.createSortedCardDeck();

    console.log("Sorterade kort: \n");
    console.log(this._sortedCards);

    this.createShuffledCardDeck();

    console.log("Blandade kort: \n");
    console.log(this._unsortedCards);


    let player1 = this.addNewPlayer("Slim");

    let player2 = this.addNewPlayer("Luke");

    this.dealFiveCards();

    console.log("Spelare 1: " + this._players[0]._name + ".\n");
    console.log(this._players[0]._cardsOnHand);

    console.log("Spelare 1: (Poäng)" + this._players[0]._name + ".\n");
    console.log(this._players[0].getTotalValueOnHand());

    console.log("Spelare 1: " + this._players[1]._name + ".\n");
    console.log(this._players[1]._cardsOnHand);

    console.log("Spelare 2: (Poäng)" + this._players[1]._name + ".\n");
    console.log(this._players[1].getTotalValueOnHand());

    console.log("Blandade kort: \n");
    console.log(this._unsortedCards);

    let index;

    for (index = 0; index < 2; index++) {
      this.throwCardsForPlayer(index);
      console.log("Player " + (index + 1) + " (thrown cards).\n");
      console.log(this._thrownCards);
      console.log("Spelare " + (index + 1) + " " +
        this._players[index]._name + ".\n");
      console.log(this._players[index]._cardsOnHand);
    }


    this.getNewCards();
    for (index = 0; index < 2; index++) {
      console.log("Spelare " + (index + 1) + " " +
        this._players[index]._name + ".\n");
      console.log(this._players[index]._cardsOnHand);
    }

    console.log("Blandade kort: \n");
    console.log(this._unsortedCards);

    this.throwAllCards();
    this.fillCardDeck();

    console.log("Nr of cards in draw deck: " +
      this._unsortedCards.length + ".");

    console.log("Nr of cards in throw deck: " +
      this._thrownCards.length + ".");

    this.createShuffledCardDeck();
    console.log("Blandade kort: \n");
    console.log(this._unsortedCards);

  }

  fillCardDeck() {

    while (this._thrownCards.length > 0) {
      this._unsortedCards.push(this._thrownCards.pop());
    }

  }

  pickPlayer() {
    this._players.unshift(this._players.pop());
    return this._players[0];
  }

  createRandomNumber(a, b) {

    let c = 0;

    if (b > a) {
      c = Math.round(Math.random() * (b - a) + a);
    }
    else {
      c = Math.round(Math.random() * (a - b) + b);
    }

    return c;

  }

}
