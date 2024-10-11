import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import '../css/QuizList.css'; 

const QuizList = ({ quizzes, onQuizDeleted, onQuizSelect }) => {
    const handleDelete = async (quizId) => {
        try {
            await axios.delete(`https://sdn302-ews3.onrender.com/quizzes/${quizId}`);
            onQuizDeleted(quizId); 
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    return (
        <div className="quiz-list-container">
            <h2 className="quiz-list-heading">Quiz List</h2>
            <List>
                {quizzes.map((quiz) => (
                    <ListItem
                        key={quiz._id}
                        onClick={() => onQuizSelect(quiz)}
                        className="quiz-list-item"
                    >
                        <ListItemText primary={quiz.title} />
                        <Button
                            onClick={() => handleDelete(quiz._id)}
                            className="quiz-list-button"
                        >
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default QuizList;
