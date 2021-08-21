import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { thunk_createQuestion } from '../../store/question';
import "./QuestionForm.css"

const CreateQuestionForm = () => {

  const user = useSelector(state => Object.values(state.session));
  const userId = user[0]?.id
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  
  const updateTitle = (e) => setTitle(e.target.value);
  // const updateDescription = (e) => setDescription(e.target.value);
  // const hideForm = true

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const payload = {
      title,
      description,
      ownerId:userId
    };
    let createdQuestion = await dispatch(thunk_createQuestion(payload))
    if (createdQuestion) {
      history.push(`/users/${userId}`);
      reset()
    }
  };

  const reset = () => {
    setTitle("")
    setDescription("")
  }
  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   hideForm();
  // };

  return (
    <section>
    <form className="submitContainer" onSubmit={handleSubmit} hidden={false}>
      <div className="submitElement">

        <input
          type="text"
          required={true}
          placeholder="Ask question here..."
          value={title}
          onChange={updateTitle} />
        </div>
        {/* <div>
          <input
            type="text-area"
            placeholder="Elaborate on your question here. . ."
            value={description}
            onChange={updateDescription} />
        </div> */}
        <div className="submitElement">
          <button className="Submit" type="submit">Create new Question</button>
        </div>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default CreateQuestionForm;