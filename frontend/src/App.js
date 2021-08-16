import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from './components/Home_page'
import QuestionDetails from "./components/QuestionDetail/QuestionDetail";
import UserQuestionList from "./components/UserProfile/UserProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/questions">
            <MainPage />
          </Route>
          <Route path="/questions/:questionId">
            <QuestionDetails/>
          </Route>
          <Route path="/users/:userId">
            <UserQuestionList/>
          </Route>  
        </Switch>
      )}
    </>
  );
}

export default App;