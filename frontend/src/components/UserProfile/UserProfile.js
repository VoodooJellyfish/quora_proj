import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { thunk_fetchUserQuestions } from '../../store/question';

import EditQuestionForm from '../EditQuestionForm';

const UserQuestionList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => Object.values(state.session));
  const userId = user[0]?.id
  const questions = useSelector(state => Object.values(state.question));
  let userQuestions = questions.filter(question => +question?.ownerId === +userId)

  console.log("^^^^^^^^^", userQuestions)

  useEffect(() => {
    dispatch(thunk_fetchUserQuestions(userId));
  }, [userId, dispatch]);

  return (
    <div>
      <ul>
          {userQuestions?.map((question) => 
          <li>
            {/* {question.title} */}
            <NavLink key={question?.id} to={`/questions/${question?.id}`}>{question?.title}</NavLink>
          </li>)}
      </ul>
      {/* <Route path="/questions/:questionId">
          <QuestionDetails/>
      </Route> */}
    </div>
  );
}
export default UserQuestionList;