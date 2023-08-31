import { useState } from 'react';

export default function Questions(props) {

    if (!props || props.all.length === 0) {
        return (
            <p className="no-questions">Aucune question disponible pour le moment.</p>
        );
    }

    // Choisir une question au hasard
    const randomQuestionIndex = Math.floor(Math.random() * props.all.length);
    const randomQuestion = props.all[randomQuestionIndex];
    const correctAnswerIndex = randomQuestion.data.resultat;

    // État pour suivre la réponse sélectionnée
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    // Gérer le clic sur une réponse
    function handleAnswerClick(index) {
        setSelectedAnswerIndex(index);
    }

    return (
        <>
            <p className="instructions">
                {randomQuestion.data.question}
            </p>
            <ul role="list" className="link-card-grid">
                {randomQuestion.data.reponses.map((p, index) => (
                <li 
                    key={index}
                    className={`link-card ${selectedAnswerIndex === index ? 'selected' : ''} ${correctAnswerIndex === index ? 'correct' : ''}`}
                    onClick={() => handleAnswerClick(index)}
                >
                    <a href='#'>
                        <h2>
                            {`Réponse ${index + 1}`}
                            <span>&rarr;</span>
                        </h2>
                        <p>
                            {p}
                        </p>
                    </a>
                </li>
                ))}
            </ul>
        </>
    )
}

