import { useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunk_createQuestion } from '../../store/question';

const CreateQuestionForm = () => {
  const questions = useSelector(state => Object.values(state.question));
  const dispatch = useDispatch();
  const {userId} = useParams()
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      ownerId:userId
    };


    let createdQuestion = await dispatch(thunk_createQuestion(payload))
    if (createdQuestion) {
      // history.push(`/users/${createdQuestion.ownerId}/`);
    }
  };
  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   hideForm();
  // };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={updateTitle} />
        <input
          type="text"
          placeholder=""
          value={description}
          onChange={updateDescription} />
        <button type="submit">Create new Question</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default CreateQuestionForm;