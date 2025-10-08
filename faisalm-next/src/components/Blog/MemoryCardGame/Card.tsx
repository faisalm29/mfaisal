import { JSX } from "react";

export interface CardIcon {
  id: number;
  icon: JSX.Element;
  matched: boolean;
}

const Card = ({
  card,
  handleChoice,
  flipped,
  disabled,
}: {
  card: CardIcon;
  handleChoice: (card: CardIcon) => void;
  flipped: boolean;
  disabled: boolean;
}) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div
      className="perspective relative h-24 w-24 cursor-pointer"
      key={card.id}
    >
      <div
        className={`h-full w-full transform transition-transform duration-300`}
      >
        <div
          className={`absolute inset-0 flex transition-all duration-300 ease-in ${flipped ? "rotate-y-0" : "rotate-y-90"} bg-accent items-center justify-center rounded border shadow-md backface-hidden`}
        >
          {card.icon}
        </div>
        <div
          onClick={handleClick}
          className="bg-secondary-200 flex h-24 w-24 items-center justify-center rounded shadow-md backface-hidden"
        ></div>
      </div>
    </div>
  );
};

export default Card;
