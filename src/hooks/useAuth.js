import {useContext} from 'react';

import {authContext} from '../contexts/auth.context.js';

export default function useAuth () {
  const context = useContext(authContext);

  if (!context) throw new Error('useAuth must be inside an authProvider!');

  const {auth, setAuth, signin, signout, alert} = context;
  return {auth, setAuth, signin, signout, alert};
}
