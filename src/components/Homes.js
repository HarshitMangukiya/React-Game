import React from "react";
import { useEffect, useState } from "react"
import Die from "./Die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

const Homes = () => {
  const [Dice, setDice] = useState(allnewdice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = Dice.every((die) => die.isHeld);
    const firstvalue = Dice[0].value;
    const allSameValue = Dice.every((die) => die.value === firstvalue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won! ");
    }
    //   console.log("Dice state changed")
  }, [Dice]);

  function generatenewdie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allnewdice() {
    const newdice = [];
    for (let i = 0; i < 10; i++) {
      newdice.push(generatenewdie());
    }
    return newdice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generatenewdie();
        })
      );
    }else{
        setTenzies(false)
        setDice(allnewdice())
    }
  }

  function holdDice(id) {
    // console.log(id)
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElement = Dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div>
      <main>
        {tenzies && <Confetti/>}
        <h1 className="text-center my-2">Tenzies</h1>
        <p className="text-center my-2">
          Roll until all dice are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">
          {diceElement}
          {/* <Die value="1"/>
    <Die value="2"/>
    <Die value="3"/>
    <Die value="4"/>
    <Die value="5"/> 
    <Die value="1"/> 
    <Die value="1"/> 
    <Die value="1"/> 
    <Die value="1"/> 
    <Die value="1"/>  */}
        </div>

        <button className="btn btn-success my-4" onClick={rollDice}>
          {tenzies ? "New Game" : "ROll"}
        </button>
      </main>
    </div>
  );
};

export default Homes;
