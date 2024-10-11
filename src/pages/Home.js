import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box className="home-container">
        {/* Title centered */}
        <Typography variant="h4" className="home-title">
          Welcome to Simple Quiz
        </Typography>

        {/* Button to navigate to the Quiz Page */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/quizzes')}
          className="home-button"  // Apply CSS class
        >
          Go to Quizzes
        </Button>

        {/* Button to navigate to the Question Page */}
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => navigate('/questions')}
          className="home-button"  // Apply CSS class
        >
          Go to Questions
        </Button>
      </Box>
    </Container>
  );
};

export default Home;