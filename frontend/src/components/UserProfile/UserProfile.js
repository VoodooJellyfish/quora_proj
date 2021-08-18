import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { thunk_fetchUserQuestions } from '../../store/question';
import { thunk_fetchUserAnswers } from '../../store/answer';

import EditQuestionForm from '../EditQuestionForm';
import '../QuestionsContainer/questionContainer.css'

const UserQuestionList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => Object.values(state.session));
  const userId = user[0]?.id
  const questions = useSelector(state => Object.values(state.question));
  const answers = useSelector(state => Object.values(state.answer))
  let userQuestions = questions.filter(question => +question?.ownerId === +userId)

  console.log("^^^^^^^^^", answers)

  useEffect(() => {
    dispatch(thunk_fetchUserQuestions(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(thunk_fetchUserAnswers(userId));
  }, [userId, dispatch]);

  return (
    <div id="main-content">
      <ul className="questionul">
          {userQuestions?.map((question) => 
          <li className="listItem">
            <div>{question.ownerId}</div>
            <div>
              <NavLink className="question" key={question?.id} to={`/questions/${question?.id}`}>{question?.title}</NavLink>
            </div>
            <div>Comments</div>
          </li>)}
      </ul>
      {/* <Route path="/questions/:questionId">
          <QuestionDetails/>
      </Route> */}
    </div>
  );
}
export default UserQuestionList;