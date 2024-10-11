import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import Home from './pages/Home';
import QuestionPage from './pages/QuestionPage';
import QuizPage from './pages/QuizPage';
import Header from './components/Header';

const App = () => {
    return (
        <Router>
            <Header />
            <Container>
                <Box sx={{ my: 4 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/questions" element={<QuestionPage />} />
                        <Route path="/quizzes" element={<QuizPage />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
};

export default App;