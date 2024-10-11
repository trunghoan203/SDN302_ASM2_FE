import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import QuizForm from '../components/QuizForm';
import QuizList from '../components/QuizList';
import QuizDisplay from '../components/QuizDisplay';

const QuizPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('https://sdn302-ac2y.onrender.com/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleQuizAdded = (newQuiz) => {
        setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
        setShowForm(false);
    };

    const handleQuizDeleted = (quizId) => {
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
    };

    const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h3" align="center" gutterBottom>
                MANAGE QUIZZES
            </Typography>
            <Button
                className='question-button'
                variant="contained"
                color="primary"
                onClick={() => setShowForm(!showForm)}
                sx={{ display: 'block', margin: '0 auto', mb: 2 }}
            >
                {showForm ? 'Cancel' : 'Create A New Quiz'}
            </Button>

            {showForm && <QuizForm onQuizAdded={handleQuizAdded} />}
            <QuizList
                quizzes={quizzes}
                onQuizDeleted={handleQuizDeleted}
                onQuizSelect={handleQuizSelect}
            />

            {selectedQuiz && (
                <QuizDisplay
                    quiz={selectedQuiz}
                    onQuizUpdated={(updatedQuiz) => setQuizzes((prevQuizzes) =>
                        prevQuizzes.map((q) => q._id === updatedQuiz._id ? updatedQuiz : q)
                    )}
                    onDelete={() => handleQuizDeleted(selectedQuiz._id)}
                />
            )}
        </Container>
    );
};

export default QuizPage;