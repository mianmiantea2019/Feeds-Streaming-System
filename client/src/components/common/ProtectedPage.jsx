import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(setAuthModalOpen(true));
    } 
  }, [user, dispatch, navigate]);
  navigate('/'); // Redirect to the home page

  return user ? children : (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
    <img src="https://ih1.redbubble.net/image.1218637089.3678/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="Membership" style={{ width: '200px', height: 'auto' }} />
      <Typography variant="h4" align="center">
        Become our member to unlock more features
      </Typography>
    </Box>
  )
};

export default ProtectedPage;