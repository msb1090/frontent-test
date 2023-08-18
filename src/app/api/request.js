import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://demo-front.probatix.de/api',
});

export const updateAuthToken = (token) => {
  instance.defaults.headers.common['X-AUTH-TOKEN'] = token;
};

const errorHandler = (error) => {
  const {
    response: {
      status,
      data: { error: errorMessage },
    },
  } = error;
  if (status === 401 && errorMessage !== 'Invalid credentials.') {
    window.location.href = '/';
  }
  return Promise.reject(new Error(errorMessage));
};

instance.interceptors.response.use((a) => a, errorHandler);

export default instance;
