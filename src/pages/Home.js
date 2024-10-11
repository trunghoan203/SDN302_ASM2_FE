import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box className="home-container">
        <Typography variant="h3" className="home-title">
          WELCOME TO HAPPY QUIZ!!!
        </Typography>

        <Button 
          variant="contained" 
        //   color="primary" 
          onClick={() => navigate('/quizzes')}
          className="home-button" 
        >
          Manage Quizzes
        </Button>

        <Button 
          variant="contained" 
        //   color="secondary" 
          onClick={() => navigate('/questions')}
          className="home-button" 
        >
          Manage Questions
        </Button>
      </Box>
    </Container>
  );
};

export default Home;