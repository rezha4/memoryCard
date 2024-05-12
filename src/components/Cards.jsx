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
  const [lostAlert, setLostAlert] = useState(false);

  useEffect(() => {
    const getCards = () => {
      // TODO: RE-FETCH AFTER LOSING
      fetch(`https://rickandmortyapi.com/api/character/${seed}`)
        .then((response) => response.json())
        .then((data) => setCharacter(data))
        .catch((error) =>
          console.error("Error fetching character:", error)
        );
    };

    getCards();
  }, []);

  function handleCardClick(cardId) {
    if (clickedCardId.includes(cardId)) {
      setScore(0);
      setClickedCardId([]);
      if (score > highScore) {
        setHighScore(score);
      }
      setLostAlert(true);
      setTimeout(() => {
        setLostAlert(false);
      }, 1500);
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
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Current Score: {score}/{seed.length}
        </h1>
        <h1 className="text-2xl">High Score: {highScore}</h1>
        <p className="text-xl">Don't click the same card twice!</p>
        <p>
          made by Rezha with React + Vite, Rick and Morty API. Hosted
          on Netlify -{" "}
          <a
            className="link text-sky-200"
            href="https://github.com/rezha4/memoryCard"
            target="_blank"
          >
            github repo here.
          </a>
        </p>
      </div>
      {lostAlert && (
        <div className="z-20 toast toast-top toast-center">
          <div className="text-center  alert bg-red-500">
            <span className="text-white font-semibold">
              Oops, you've clicked that before <br />
              Score resets to 0!
            </span>
          </div>
        </div>
      )}
      <div className="mt-8 flex flex-wrap gap-2 justify-center items-center">
        {character.map((char) => {
          return (
            <div
              className="z-1 max-w-fit cursor-pointer transform active:scale-90"
              key={char.id}
              onClick={() => {
                setTimeout(() => {
                  handleCardClick(char.id);
                }, 150);
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
