import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { thunk_fetchUserQuestions } from '../../store/question';
import { thunk_fetchUserAnswers } from '../../store/answer';


import '../QuestionsContainer/questionContainer.css'

const UserCommentList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => Object.values(state.session));
  const userId = user[0]?.id

  const answers = useSelector(state => Object.values(state.answer))
  let userAnswers = answers.filter(answer=> +answer?.userId === +userId)

  useEffect(() => {
    dispatch(thunk_fetchUserAnswers(userId));
  }, [userId, dispatch]);

  return (
    <div id="main-content">
      <ul className="questionul">
          {userAnswers?.map((answer) => 
          <li className="listItem">
            <div>{answer.userId}</div>
            <div>
              <NavLink className="answer" key={answer?.id} to={`/answers/${answer?.id}`}>{answer?.answer}</NavLink>
            </div>
          </li>)}
      </ul>
      {/* <Route path="/questions/:questionId">
          <QuestionDetails/>
      </Route> */}
    </div>
  )

}

export default UserCommentList;