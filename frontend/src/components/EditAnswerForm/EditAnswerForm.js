import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_deleteAnswer, thunk_editAnswer } from '../../store/answer';
import "./EditAnswerForm.css"

const EditAnswerForm = ({comment, hideEdit, hideDelete}) => {

  let questionId = comment?.questionId
  const history = useHistory()
  const user = useSelector(state => Object.values(state.session));
  let userId = user[0]?.id
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");

  
  // const [showEditQuestionForm, setShowEditQuestionForm] = useState(false);
  // const [editItemId, setEditItemId] = useState(null);

  const updateAnswer = (e) => setAnswer(e.target.value);

  // useEffect(() => {
  //   dispatch(getPokemonTypes());
  // }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...comment,
      questionId,
      answer,
      userId
    };
    // let createdPokemon = await dispatch(thunk_createPokemon(payload))
    let updatedAnswer = await dispatch(thunk_editAnswer(payload));
    if (updatedAnswer) {
      // hideForm();
      history.push(`/questions/${questionId}`)
      console.log("SUCCESS EDIT")
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(thunk_deleteAnswer(comment))
    history.push(`/questions/${questionId}`)
  }

  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   hideForm();
  // };

  return (
    <section className="editContainer">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="your updated answer. . ."
            value={answer}
            onChange={updateAnswer}
            className="inputF" />
          <button className="edit-btn formE" hidden={hideEdit} type="submit">Submit Edit</button>
        </form>
      </div>
      <div>
        <form onSubmit={handleDelete}>
          <button className="del-btn" hidden={hideDelete} type="submit">Delete Answer</button>
        </form>
      </div>
    </section>
  );
};

export default EditAnswerForm;