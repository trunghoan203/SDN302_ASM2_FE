import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';
import DisplayQuestion from '../components/DisplayQuestion';
import '../css/Main.css';

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://sdn302-ac2y.onrender.com/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleQuestionAdded = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
        setFormVisible(false);
    };

    const handleQuestionDeleted = (deletedQuestionId) => {
        setQuestions(questions.filter((question) => question._id !== deletedQuestionId));
    };

    const handleQuestionSelect = (question) => {
        setSelectedQuestion(question);
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h3" align="center" gutterBottom>
                MANAGE QUESTIONS
            </Typography>
            <Button
                className='quiz-button'
                variant="contained"
                color="primary"
                onClick={() => setFormVisible(!isFormVisible)}
                sx={{ display: 'block', margin: '0 auto', mb: 2 }}
            >
                {isFormVisible ? 'Cancel' : 'Create A New Question'}
            </Button>

            {isFormVisible && <QuestionForm onQuestionAdded={handleQuestionAdded} />}
            <QuestionList
                questions={questions}
                onQuestionDeleted={handleQuestionDeleted}
                onQuestionSelect={handleQuestionSelect}
            />

            {selectedQuestion && (
                <DisplayQuestion
                    question={selectedQuestion}
                    onUpdateQuestion={(updatedQuestion) => setQuestions((prevQuestions) =>
                        prevQuestions.map((q) =>
                            q._id === updatedQuestion._id ? updatedQuestion : q
                        )
                    )}
                />
            )}
        </Container>
    );
};

export default QuestionPage;