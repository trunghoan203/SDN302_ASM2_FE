import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar, Alert, Card, CardContent, Typography } from '@mui/material';
import '../css/QuizForm.css'; // Import the CSS file

const QuizForm = ({ onQuizAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://sdn302-ews3.onrender.com/quizzes', {
                title,
                description,
            });
            onQuizAdded(response.data); // Notify parent component of the new quiz
            setSnackbarMessage('Quiz added successfully!');
            setOpenSnackbar(true);
            // Reset form
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding quiz:', error);
            setSnackbarMessage('Failed to add quiz.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Card variant="outlined" className="quiz-form-card">
            <CardContent className="quiz-form-content">
                <Typography variant="h6" gutterBottom className="quiz-form-title">
                    Create Quiz
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Quiz Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        className="quiz-form-input"
                    />
                    <TextField
                        label="Quiz Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        className="quiz-form-input"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="quiz-form-button"
                    >
                        Create
                    </Button>
                </form>
            </CardContent>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" className="snackbar-alert">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default QuizForm;
