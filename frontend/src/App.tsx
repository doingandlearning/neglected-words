import "./App.css";

import Card from "./components/Card";
import { useGame } from "./hook/useGame";


function App() {
  const { score, gameWords, updateSelectedWord, selectedWord, completed, definitions, updateSelectedDefinition, selectedDefinition } = useGame()

  return (
    <>
      <h1 className="">Neglected Words</h1>
      <h2>Score: {score}</h2>
      <div className="column">
        <div>
          <h2>Words</h2>
          {gameWords?.map((word) => (
            <Card
              key={word.id}
              id={word.id}
              onClick={(id: number) => updateSelectedWord(id)}
              selected={selectedWord?.id === word?.id}
              completed={completed.includes(word.id)}
            >
              {word.word}
            </Card>
          ))}
        </div>
        <div>
          <h2>Definitions</h2>
          {definitions?.map((word) => (
            <Card
              key={word.id}
              id={word.id}
              onClick={(id: number) => updateSelectedDefinition(id)}
              selected={selectedDefinition?.id === word.id}
              completed={completed.includes(word.id)}
            >
              {word.definition}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
