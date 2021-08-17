// Import hooks from 'react'. Which hook is meant for causing side effects?
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';

// Import the thunk creator
import { thunk_fetchQuestion } from '../../store/question';
import EditQuestionForm from '../EditQuestionForm';

const QuestionDetails = () => {
  // Declare variables from hooks
  const dispatch = useDispatch();

  const {questionId} = useParams()
  const questions = useSelector(state => Object.values(state.question));

  const user = useSelector(state => Object.values(state.session))
  const userId = user[0].id
  console.log("Entire LIst", userId)

  let questionChoice = questions.find(question => +question.id === +questionId)

  console.log("#####", questionChoice)

  let canEdit = false
  let canDelete = false

  // if (questionChoice.id === userId) {
  //   canEdit = true
  //   canDelete = true
  // }


  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    dispatch(thunk_fetchQuestion(questionId));
  }, [questionId, dispatch]);

  return (
    <div>
      
      {questionChoice.title}
      {questionChoice.description}
      <EditQuestionForm question={questionChoice}/>
    </div>
  );
};

export default QuestionDetails;