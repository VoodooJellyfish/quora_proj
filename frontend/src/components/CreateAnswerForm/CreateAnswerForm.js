import {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { thunk_createAnswer } from '../../store/answer';
import "./CreateAnswer.css"

const CreateAnswerForm = ({question}) => {

  const questionId = question?.id
  const user = useSelector(state=>state.session.user)
  const userId = user?.id
  const dispatch = useDispatch();
  const history = useHistory();
  const [answer, setAnswer] = useState("");
  const updateAnswer = (e) => setAnswer(e.target.value);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const payload = {
      answer,
      userId,
      questionId
    };
    let createdAnswer= await dispatch(thunk_createAnswer(payload))
    if (createdAnswer) {
      history.push(`/questions/${questionId}`);
      reset()
    }
  };

  const reset = () => {
    setAnswer("")
  }

  return (
    <section className="ctn">
    <form  className="formForm" onSubmit={handleSubmit} hidden={false}>
        <input
          type="text"
          placeholder="Type answer here. . ."
          value={answer}
          onChange={updateAnswer} />
        <button className="edit-btn edit5" type="submit">Create Answer</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default CreateAnswerForm;