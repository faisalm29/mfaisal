"use client";

import { useState, useEffect } from "react";
import {
  RiPokerClubsFill,
  RiPokerDiamondsFill,
  RiPokerHeartsFill,
  RiPokerSpadesFill,
} from "@remixicon/react";
import Card from "./Card";
import { CardIcon } from "./Card";

const cardIcons = [
  <RiPokerClubsFill className="text-secondary-200" />,
  <RiPokerDiamondsFill className="text-secondary-200" />,
  <RiPokerHeartsFill className="text-secondary-200" />,
  <RiPokerSpadesFill className="text-secondary-200" />,
];

const MemoryCardGame = () => {
  const [cards, setCards] = useState<CardIcon[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<CardIcon | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardIcon | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardIcons, ...cardIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon) => ({ icon, id: Math.random(), matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: CardIcon) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.icon === choiceTwo.icon) {
        setCards((prevCard) =>
          prevCard.map((card) => {
            if (card.icon === choiceOne.icon) {
              return {
                ...card,
                matched: true,
              };
            } else {
              return card;
            }
          }),
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">Memory Game</h1>
      <button
        className="mb-6 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        onClick={shuffleCards}
      >
        New Game
      </button>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-lg">Turns: {turns}</p>
    </div>
  );
};

export default MemoryCardGame;
