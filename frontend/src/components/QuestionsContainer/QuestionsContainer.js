// Import hooks from 'react'. Which hook is meant for causing side effects?
import { useEffect } from 'react';
import QuestionDetails from '../QuestionDetail/QuestionDetail';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import './questionContainer.css'

// Import the thunk creator
import { fetchQuestions } from '../../store/question';
// import styles from './UsersContainer.module.css';
// import { fakeUsers } from '../../assets';
// import UserRow from '../UserRow';

const QuestionsContainer = () => {
  // Declare variables from hooks
  const dispatch = useDispatch();
  let questions = useSelector(state => Object.values(state.question));
  questions = questions.slice(0,questions.length-1)
  // console.log("@@@@@",questions[0]?.User.username)
  console.log(questions)

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div id="main-content">
      <ul className="questionul">
          {questions?.map((question) => 
          <li className="listItem">
            <div>{question.User ? question.User.username : []}</div>
            <div className="question-square">
              <NavLink className="question" key={question?.id} to={`/questions/${question?.id}`}>{question?.title}</NavLink>
            </div>
            <div className="bottom">{question?.createdAt}</div>
          </li>)}
      </ul>
      {/* <Route path="/questions/:questionId">
          <QuestionDetails/>
      </Route> */}
    </div>
  );
};

export default QuestionsContainer;