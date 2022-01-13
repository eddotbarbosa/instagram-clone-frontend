import {useState, useEffect} from 'react';

import api from '../services/api.js';

export default function useAuthProvider () {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authorization');

    if (token) {
      api.defaults.headers.common['authorization'] = token;
      setAuth(true);
    }

    return setLoading(false);
  }, []);

  async function signin (event, email, password, cb) {
    event.preventDefault();

    const login = await api.post('/auth/signin', {
      email: email,
      password: password
    });

    if (login.data.error) {
      return console.log(login.data.error);
    }

    if (login.data.token) {
      const token = login.data.token;

      localStorage.setItem('authorization', token);
      api.defaults.headers.common['authorization'] = token;

      setAuth(true);
      setAlert('');

      return cb();
    }

    if (login.data.result === 'user does not exist!') {
      return setAlert('The username you entered doesn\'t belong to an account. Please check your username and try again.');
    } else if (login.data.result === 'passwords do not match!') {
      return setAlert('Sorry, your password was incorrect. Please double-check your password');
    }

    return console.log(login.data.result);
  }

  function signout (cb) {
    const token = localStorage.getItem('authorization');

    if (token) {
      localStorage.removeItem('authorization');
      api.defaults.headers.common['authorization'] = undefined;
      setAuth(false);
      return cb();
    }
  }

  return {auth, setAuth, signin, signout, loading, alert};
}
