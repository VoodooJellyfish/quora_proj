// Import hooks from 'react'. Which hook is meant for causing side effects?
import { useEffect } from 'react';
import QuestionDetails from '../QuestionDetail/QuestionDetail';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

// Import the thunk creator
import { fetchQuestions } from '../../store/question';
// import styles from './UsersContainer.module.css';
// import { fakeUsers } from '../../assets';
// import UserRow from '../UserRow';

const QuestionsContainer = () => {
  // Declare variables from hooks
  const dispatch = useDispatch();
  const questions = useSelector(state => Object.values(state.question));
  // console.log(questions)

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div>
      <ul>
          {questions.map((question) => 
          <li>
            {/* {question.title} */}
            <NavLink key={question?.id} to={`/questions/${question?.id}`}>{question.title}</NavLink>
          </li>)}
      </ul>
      {/* <Route path="/questions/:questionId">
          <QuestionDetails/>
      </Route> */}
    </div>
  );
};

export default QuestionsContainer;