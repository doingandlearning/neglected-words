import { load } from "cheerio";
import fs from "node:fs/promises";
const url = "https://wordwarriors.wayne.edu/list";

import { Word } from "./types";

async function getWords(): Promise<Array<Word>> {
  const response = await fetch(url);
  const data = await response.text();
  const $ = load(data);
  const words: Array<Word> = [];
  let i = 0;
  $("li").each((i, el) => {
    const wordElement = $(el).find(".word");
    const definitionElement = $(el).find(".definition");
    const sentenceElement = $(el).find(".sentence");
    if (
      !wordElement.text() ||
      !definitionElement.text() ||
      !sentenceElement.text()
    )
      return;
    words.push({
      word: wordElement.text(),
      definition: definitionElement.text(),
      sentence: sentenceElement.text(),
      id: i++,
    });
  });
  return words;
}

getWords().then(
  async (data) => await fs.writeFile("words.json", JSON.stringify(data))
);
