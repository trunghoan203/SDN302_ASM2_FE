import React from 'react';
import { List, ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import '../css/QuestionList.css';

const QuestionList = ({ questions, onQuestionDeleted, onQuestionSelect }) => {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

    const handleDelete = async (questionId) => {
        try {
            await axios.delete(`https://sdn302-ews3.onrender.com/questions/${questionId}`);
            onQuestionDeleted(questionId);
            setSnackbarMessage('Question deleted successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error deleting question:', error);
            setSnackbarMessage('Failed to delete question.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="question-list-container">
            <h2 className="question-list-heading">Question List</h2>
            <List>
                {questions.map((question) => (
                    <ListItem 
                        key={question._id} 
                        className="question-list-item"
                    >
                        <ListItemText
                            primary={question.text}
                            onClick={() => onQuestionSelect(question)}
                            className="question-text"
                        />
                        <Button 
                            onClick={() => handleDelete(question._id)} 
                            className="delete-button"
                        >
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default QuestionList;
