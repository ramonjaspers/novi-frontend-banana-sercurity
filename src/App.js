import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import { AuthContext } from './components/AuthContext';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  const { isAuth } = useContext(AuthContext);

/**
 * renders the correct nodes based on the user state
 * 
 * @param {object} children contains the underlaying nodes
 * @param {boolean} authState contains the user state
 * @param {object} rest provides the data
 * @returns 
 */
  function PrivateRoute({ children, authState, ...rest }) {
    return (
      <Route {...rest}>
        {authState ? children : <Redirect to="/signin" />}
      </Route>
    );
  }
  return (
    <>
      <NavBar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute exact path="/profile" authState={isAuth}>
            <Profile />
          </PrivateRoute>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
