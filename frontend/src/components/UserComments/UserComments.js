import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, } from 'react-router-dom';


import { thunk_fetchUserAnswers } from '../../store/answer';
import "./UserComments.css"


import '../QuestionsContainer/questionContainer.css'

const UserCommentList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => Object.values(state.session));
  const userId = user[0]?.id

  const answers = useSelector(state => Object.values(state.answer))
  // console.log("0000000", answers)
  let userAnswers = answers.filter(answer=> +answer?.userId === +userId)

  useEffect(() => {
    dispatch(thunk_fetchUserAnswers(userId));
  }, [userId, dispatch]);

  return (
    <div id="main-content">
      <ul className="questionul">
          {userAnswers?.map((answer) => 
          <li key={answer?.id} className="alistItem">
            <div className="directList">
              <NavLink className="url" key={answer?.Question?.id} to={`/questions/${answer?.Question?.id}`}> 
                {answer.Question ? answer.Question.title: []}
              </NavLink>
            </div>
            <div className="directList"> 
              Your Answer: <NavLink className="url" key={answer?.id} to={`/answers/${answer?.id}`}>{answer?.answer}</NavLink>
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