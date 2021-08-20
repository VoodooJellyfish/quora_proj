import { useEffect } from 'react';
import QuestionDetails from '../QuestionDetail/QuestionDetail';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
// import './AnswerList.css'

import { fetchAnswers } from '../../store/answer';

const AnswersList = ({question}) => {
  // Declare variables from hooks
  const dispatch = useDispatch();
  // let questions = useSelector(state => Object.values(state.question));
  let answers = useSelector(state => Object.values(state.answer));
  let questionAnswers = answers?.filter(answer => +answer?.questionId === +question?.id)
  // questions = questions.slice(0,questions.length-1)
  // console.log("@@@@@",questions[0]?.User.username)
  console.log("@@@@@", questionAnswers)

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    if(question) {
      dispatch(fetchAnswers(question.id));
    }
    
  }, [question, dispatch]);

  return (
    <div id="main-content">
      <ul className="questionul">
          {questionAnswers?.map((answer) => 
          <li className="listItem">
            <div>{answer.User ? answer.User.username : []}</div>
            <div className="question-square">
              <NavLink className="question" key={answer?.id} to={`/answers/${answer.id}`}>{answer?.answer}</NavLink>
            </div>
            <div>{answer?.createdAt}</div>
          </li>)}
      </ul>
      {/* <Route path="/questions/:questionId">
          <QuestionDetails/>
      </Route> */}
    </div>
  );
};

export default AnswersList;