import fastify, { FastifyRequest } from "fastify";
import fs from "node:fs";
import { Word } from "./types";

const app = fastify();

const words = JSON.parse(fs.readFileSync("./src/words.json", "utf-8"));

function getRandomWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  return randomWord;
}

let todaysWord: Word = getRandomWord();

function setTodaysWord() {
  todaysWord = getRandomWord();
  setTimeout(setTodaysWord, 1000 * 60 * 60 * 24);
}
setTodaysWord();

app.get("/words/random", async (request, reply) => {
  return getRandomWord();
});

app.get(
  "/words/:id",
  async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const word = words.find(
      (word: Word) => word.id === Number(request.params.id)
    );
    return word;
  }
);

app.get("/words", async (request, reply) => {
  reply.header("Content-Type", "text/html; charset=utf-8");
  const word: Word = todaysWord;
  return `<html>
	<body>
			<h1>Words</h1>
			<h2>${word.word}</h2>
			<p><i>${word.definition}</i></p>
			<p>${word.sentence}</p>
	</body>
	</html>`;
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  app.log.info(`server listening on ${address}`);
});
