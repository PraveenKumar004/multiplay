import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [quizFinished, setQuizFinished] = useState(false);
    const [view, setview] = useState(false)
    const [val, setVal] = useState({
        score: 0
    });

    const { id } = useParams();

    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            correctAnswer: 'Paris',
        },
        {
            question: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '4',
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
            correctAnswer: 'Mars',
        },
        {
            question: 'What is the largest ocean on Earth?',
            options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
            correctAnswer: 'Pacific',
        },
        {
            question: 'Who wrote "Romeo and Juliet"?',
            options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
            correctAnswer: 'William Shakespeare',
        },
    ];

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        setSelectedOption('');
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const handleSubmitQuiz = () => {
        const finalScore = score + (selectedOption === questions[currentQuestion].correctAnswer ? 1 : 0);
        setVal({ ...val, score: finalScore });
        setQuizFinished(true);
    };
    const [hide, sethide] = useState(true);
    const send = () => {
        setview(true);
        sethide(false);
        axios.put( `/score/${id}`,val)
    }


    return (
        <div>
            <h2 className='mb-3 mt-2 text-center'>Quiz Game</h2>
            {quizFinished ? (
                 <>
                 <div>
                     {view && (
                        <div>
                         <h3 className='mt-5 text-center'>Your score is </h3>
                         <h2 className='text-center'>{val.score}</h2>
                         </div>
                     )}
                 </div>
                 <div> 
                     {hide &&(                   
                         <div>
                             <h4>Click to Submit and View Score</h4>
                             <button onClick={send} className='bt2 mt-2'>Submit</button>
                         </div>
                     )}
                 </div>
             </>



            ) : (
                <div>
                    <h3>Question {currentQuestion + 1}</h3>
                    <h5>{questions[currentQuestion].question}</h5>
                    <form>
                        {questions[currentQuestion].options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={index}
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={handleOptionChange}
                                    className='m-2'
                                />
                                <label htmlFor={index}>{option}</label>
                            </div>
                        ))}
                    </form>
                    {currentQuestion > 0 && (
                        <button onClick={handlePreviousQuestion} className='bt2 m-2 mt-3'>Previous</button>
                    )}
                    {currentQuestion === questions.length - 1 ? (
                        <>
                            <button onClick={handleSubmitQuiz} className='bt2 m-2 mt-3'>Finish</button>
                        </>
                    ) : (
                        <button onClick={handleNextQuestion} className='bt2 m-2 mt-3'>Next</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizGame;
