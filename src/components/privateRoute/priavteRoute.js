import {Route, Redirect} from 'react-router-dom';

import useAuth from '../../hooks/useAuth.js';

export default function PrivateRoute ({children, ...rest}) {
  const {auth} = useAuth();

  return (
    <Route {...rest} render={({location}) =>
      auth ? (
        children
      ) : (
        <Redirect to={{pathname: '/', state: {from: location}}} />
      )
    } />
  );
}
