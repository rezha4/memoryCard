import "../style/style.css";
import { useEffect, useState } from "react";

const seed = [];
do {
  seed.push(Math.floor(Math.random() * 826));
} while (seed.length < 10);

function Cards() {
  const [character, setCharacter] = useState([]);
  const [score, setScore] = useState(0);
  const [clickedCardId, setClickedCardId] = useState([]);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${seed}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.error("Error fetching character:", error));
  }, []);

  function handleCardClick(cardId) {
    if (clickedCardId.includes(cardId)) {
      setScore(0);
      setClickedCardId([]);
      if (score > highScore) {
        setHighScore(score);
      }
    } else {
      setClickedCardId([...clickedCardId, cardId]);
      setScore(score + 1);
      shuffle(character);
    }
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <>
      <h1>Current Score: {score}/{seed.length}</h1>
      <h1>High Score: {highScore}</h1>
      <p>Card memory game. Don't click the same card twice!</p>
      <div className="card-container">
        {character.map((char) => {
          return (
            <div
              key={char.id}
              onClick={() => {
                handleCardClick(char.id);
              }}
            >
              <img src={char.image} alt="" />
              <p>{char.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export { Cards };
