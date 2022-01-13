import {createContext} from 'react';

import useAuthProvider from '../hooks/useAuthProvider.js';

export const authContext = createContext(false);

export function AuthProvider ({children}) {
  const {auth, setAuth, signin, signout, loading, alert} = useAuthProvider();

  if (loading) {
    return null;
  }

  return (
    <authContext.Provider value={{auth, setAuth, signin, signout, alert}}>
      {children}
    </authContext.Provider>
  );
}
