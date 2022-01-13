import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './styles/global.scss';

import {AuthProvider} from './contexts/auth.context.js';

import Home from './pages/home/home.js';
import Login from './pages/login/login.js';
import Signup from './pages/signup/signup.js';
import Profile from './pages/profile/profile.js';
import Post from './pages/post/post.js';
import AccountSettings from './pages/accountSettings/accountSettings.js';

import PrivateRoute from './components/privateRoute/priavteRoute.js';
import Navbar from './components/navbar/navbar.js';
import Footer from './components/footer/footer.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path={["/accounts/login", "/accounts/emailsignup"]}>
            {null}
          </Route>
          <Route path="*">
            <Navbar />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/accounts/login">
            <Login />
          </Route>
          <Route path="/accounts/emailsignup">
            <Signup />
          </Route>
          <PrivateRoute path="/accounts/edit">
            <AccountSettings />
          </PrivateRoute>
          <Route path="/p/:postid">
            <Post />
          </Route>
          <Route path="/:username">
            <Profile />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <Footer topics />
          </Route>
          <Route path="*">
            <Footer />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
