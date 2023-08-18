import {
  Paper,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  STATUS,
  setUser,
  loginUser,
  selectStatus,
  resetStatus,
  selectError,
} from '../../features/user/userSlice';

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: 'test8274837@test.com',
    password: 'testpassword',
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const navigate = useNavigate();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => () => dispatch(resetStatus()), []);

  // validate email
  const validateFormData = (data) => data.email && data.password;

  const handleChange = (e) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedFormData);
    if (validateFormData(updatedFormData)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const loginHandler = async (e) => {
    dispatch(setUser(formData));
    const loginResultAction = await dispatch(loginUser());
    if (loginUser.fulfilled.match(loginResultAction)) {
      navigate('/applications');
    }
  };

  const isPending = status === STATUS.PENDING;
  const isError = status === STATUS.ERROR;

  return (
    <Paper elevation={3} sx={{ padding: 2, width: 350, my: 4, mx: 'auto' }}>
      <Stack gap={3} sx={{ alignItems: 'center' }} m={2}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          type="email"
          variant="outlined"
          required
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          type="password"
          variant="outlined"
          autoComplete="off"
          required
          fullWidth
          onChange={handleChange}
        />
      </Stack>

      <Stack direction="row" gap={3} sx={{ alignItems: 'center' }} m={2}>
        <Button
          variant="contained"
          onClick={loginHandler}
          disabled={!isFormValid}
        >
          {isPending ? <CircularProgress size={25} /> : 'Login'}
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" component="p">
            Don&apos;t have an account?
          </Typography>
          <Link
            variant="body2"
            sx={{ display: 'inline', ml: 1 }}
            onClick={() => navigate('/register')}
          >
            Register
          </Link>
        </Box>
      </Stack>
      {isError && (
        <Typography m={2} color="error">
          {error}
        </Typography>
      )}
    </Paper>
  );
}

export default Login;
