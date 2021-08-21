import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';

// Import the thunk creator
import { thunk_fetchAnswer } from '../../store/answer';


import EditAnswerForm from '../EditAnswerForm';
import "./AnswerDetail.css"

const AnswerDetail = () => {
  // Declare variables from hooks
  const dispatch = useDispatch();

  const {answerId} = useParams()
  const answers = useSelector(state => Object.values(state.answer));
  

  const user = useSelector(state => Object.values(state.session))
  const userId = user[0]?.id

  let answerChoice = answers.find(answer => +answer?.id === +answerId)

  let hideEdit = true
  let hideDelete = true

  if (answerChoice?.userId === userId) {
    hideEdit = false
    hideDelete = false
  }


  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(thunk_fetchAnswer(answerId));
  }, [answerId, dispatch]);

  return (
    <div className="answerDetail">
      
      <div className="answerWords">{answerChoice?.answer}</div>
      <div hidden={hideEdit}>
        <EditAnswerForm comment={answerChoice} hideEdit={hideEdit} hideDelete={hideDelete}/>
      </div>
    </div>
  );
};

export default AnswerDetail;