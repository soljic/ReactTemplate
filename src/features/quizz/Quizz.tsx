import React, { useState } from 'react';
import './Quizz.css';

export default function Quizz() {
    const questions = [
		{
			questionText: 'What country has the highest life expectancy?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'Vienna', isCorrect: false },
				{ answerText: 'Hong Kong', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'What year was the United Nations established?',
			answerOptions: [
				{ answerText: '1945', isCorrect: true },
				{ answerText: '1900', isCorrect: false },
				{ answerText: '1970', isCorrect: false },
				{ answerText: '1990', isCorrect: false },
			],
		},
		{
			questionText: 'What artist has the most streams on Spotify? ',
			answerOptions: [
				{ answerText: 'Rihanna', isCorrect: false },
				{ answerText: 'Bruce Springsteen', isCorrect: false },
				{ answerText: 'Taylor Swift', isCorrect: false },
				{ answerText: 'Drake', isCorrect: true },
			],
		},
        {
			questionText: 'How many elements are in the periodic table? ',
			answerOptions: [
				{ answerText: '150', isCorrect: false },
				{ answerText: '200', isCorrect: false },
				{ answerText: '97', isCorrect: false },
				{ answerText: '118', isCorrect: true },
			],
		},
        {
			questionText: 'What is the highest-rated film on IMDb as of January 1st, 2022? ',
			answerOptions: [
				{ answerText: 'Shawshank Redemption', isCorrect: true },
				{ answerText: "Schindler's list", isCorrect: false },
				{ answerText: 'The Godfather', isCorrect: false },
				{ answerText: '12 Angry Men', isCorrect: false },
			],
		},
        {
			questionText: 'What company was initially known as "Blue Ribbon Sports"? ',
			answerOptions: [
				{ answerText: 'Addidas', isCorrect: false },
				{ answerText: 'Puma', isCorrect: false },
				{ answerText: 'Nike', isCorrect: true },
				{ answerText: 'Asics', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect: boolean) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}

