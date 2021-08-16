import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { thunk_fetchUserQuestions } from '../../store/question';

const UserQuestionList = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => Object.values(state.question));
  const {userId} = useParams()

  useEffect(() => {
    dispatch(thunk_fetchUserQuestions(userId));
  }, [userId, dispatch]);

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
}
export default UserQuestionList;