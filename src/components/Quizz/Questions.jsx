import { useState, useEffect } from 'react';

export default function Questions(props) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showNextQuestion, setShowNextQuestion] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setSelectedAnswerIndex(null);
        setShowNextQuestion(false);
    }, [currentQuestionIndex]);

    const currentQuestion = props.all[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.data.resultat;

    function handleAnswerClick(index) {
        setSelectedAnswerIndex(index);
        setShowNextQuestion(true);
        if (index === correctAnswerIndex) {
            setScore(score + 1);
        }
    }

    function handleNextQuestionClick() {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    return (
        <>
            {currentQuestionIndex < props.all.length ? (
                <>
                    <p className="instructions">
                        {currentQuestion.data.question}
                    </p>
                    <ul role="list" className="link-card-grid">
                        {currentQuestion.data.reponses.map((p, index) => (
                            <li 
                                key={index}
                                className={`link-card ${selectedAnswerIndex === index ? 'selected' : ''} ${selectedAnswerIndex === index && correctAnswerIndex === index ? 'correct' : ''}`}
                                onClick={() => handleAnswerClick(index)}
                            >
                                <span>
                                    <h2>
                                        {`Réponse ${index + 1}`}
                                    </h2>
                                    <p>
                                        {p}
                                    </p>
                                </span>
                            </li>
                        ))}
                        {showNextQuestion && (
                            <li className='link-card'>
                                <a href="#" onClick={handleNextQuestionClick}>
                                    <h2>
                                        Question suivante
                                        <span>&rarr;</span>
                                    </h2>
                                </a>
                            </li>
                        )}
                    </ul>
                    {selectedAnswerIndex !== null && selectedAnswerIndex === correctAnswerIndex && (
                        <p className="instructions">
                            <strong>Bonne réponse </strong><br/>
                            {currentQuestion.body}
                        </p>
                    )}
                </>
            ) : (
                <p className="instructions">
                    Bravo, vous avez terminé le quizz ! Votre score est de {score} sur {props.all.length}.
                </p>
            )}
        </>
    )
}