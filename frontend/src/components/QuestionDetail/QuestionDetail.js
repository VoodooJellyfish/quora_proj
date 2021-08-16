// Import hooks from 'react'. Which hook is meant for causing side effects?
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';

// Import the thunk creator
import { thunk_fetchQuestion } from '../../store/question';

const QuestionDetails = () => {
  // Declare variables from hooks
  const dispatch = useDispatch();
  const {questionId} = useParams()
  const questions = useSelector(state => Object.values(state.question));
  console.log("Entire LIst", questions)
  let questionChoice = questions.find(question => +question.id === +questionId)
  console.log("Chosen Question", questionChoice)

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(thunk_fetchQuestion(questionId));
  }, [questionId, dispatch]);

  return (
    <div>
      {questionChoice.title}
    </div>
  );
};

export default QuestionDetails;