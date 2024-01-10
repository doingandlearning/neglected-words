import { useEffect, useState } from "react";
import words from "../assets/words.json";
type Word = {
	word: string;
	definition: string;
	id: number;
	sentence: string;
};

export function useGame() {
	const [gameWords, setGameWords] = useState<Word[] | null>(null);
	const [definitions, setDefinitions] = useState<{
		id: number;
		definition: string;
	}[] | null>(null);

	const [selectedWord, setSelectedWord] = useState<Word | null>(null);
	const [selectedDefinition, setSelectedDefinition] = useState<{
		id: number;
		definition: string;
	} | null>(null);

	const [score, setScore] = useState(0);

	const [completed, setCompleted] = useState<number[]>([]);

	function setNewWords() {
		const newWords: Word[] = [];

		while (newWords.length < 4) {
			const randomWord = words[Math.floor(Math.random() * words.length)];
			if (newWords.includes(randomWord)) continue;
			if (completed.includes(randomWord.id)) continue;
			newWords.push(randomWord);
		}
		setGameWords(newWords);

		const newDefinitions = newWords
			.map((word) => ({ id: word.id, definition: word.definition }))
			.sort(() => Math.random() - 0.5);
		// jumble array

		setDefinitions(newDefinitions);
	}

	useEffect(() => {
		setNewWords();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function updateSelectedWord(id: number) {
		const word = gameWords?.find((word) => word.id === id);
		if (!word) return;
		setSelectedWord(word);
	}

	function updateSelectedDefinition(id: number) {
		const definition = definitions?.find((definition) => definition.id === id);
		if (!definition) return;
		setSelectedDefinition(definition);
	}

	useEffect(() => {
		if (!selectedWord || !selectedDefinition) return;
		if (selectedWord?.id === selectedDefinition?.id) {
			setScore(score + 1);
			const newCompleted = [...completed, selectedWord.id];
			setCompleted(newCompleted);
			setSelectedWord(null);
			setSelectedDefinition(null);
			if (
				gameWords
					?.map((word) => word.id)
					.every((id) => newCompleted.includes(id))
			) {
				setNewWords();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedWord, selectedDefinition]);

	return {
		score,
		gameWords,
		updateSelectedWord,
		selectedWord,
		completed,
		definitions,
		updateSelectedDefinition,
		selectedDefinition,
	};
}
