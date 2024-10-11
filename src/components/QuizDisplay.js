import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const QuizDisplay = ({ quiz, onQuizUpdated, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false); // Quản lý trạng thái edit
    const [title, setTitle] = useState(quiz.title); // State lưu trữ title của quiz
    const [description, setDescription] = useState(quiz.description); // State lưu trữ description của quiz

    // Hàm xử lý khi người dùng muốn cập nhật quiz
    const handleUpdate = async () => {
        try {
            const updatedQuiz = { title, description }; // Chỉ gửi title và description

            // Gửi yêu cầu PUT tới backend để cập nhật quiz
            const response = await axios.put(`https://sdn302-ews3.onrender.com/quizzes/${quiz._id}`, updatedQuiz);

            // Gọi hàm onQuizUpdated để cập nhật danh sách quizzes ở component cha
            onQuizUpdated(response.data);

            setIsEditing(false); // Tắt chế độ edit sau khi cập nhật thành công
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
    };

    return (
        <Box>
            {isEditing ? (
                <Box>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={handleUpdate} variant="contained" color="primary">
                        update
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6">{quiz.title}</Typography>
                    <Typography>{quiz.description}</Typography>
                    <Button onClick={() => setIsEditing(true)} variant="contained" color="primary">
                        Edit
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default QuizDisplay;