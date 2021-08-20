import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_editQuestion, thunk_deleteQuestion } from '../../store/question';
import "./EditQuestionForm.css"

const EditQuestionForm = ({question, hideEdit, hideDelete}) => {
  const history = useHistory()
  const user = useSelector(state => Object.values(state.session));
  let userId = user[0]?.id
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');

  
  // const [showEditQuestionForm, setShowEditQuestionForm] = useState(false);
  // const [editItemId, setEditItemId] = useState(null);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  // useEffect(() => {
  //   dispatch(getPokemonTypes());
  // }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...question,
      title,
      description,
      ownerId:userId
    };
    // let createdPokemon = await dispatch(thunk_createPokemon(payload))
    let updatedQuestion = await dispatch(thunk_editQuestion(payload));
    if (updatedQuestion) {
      // hideForm();
      history.push(`/users/${userId}`)
      console.log("SUCCESS EDIT")
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(thunk_deleteQuestion(question))
    history.push(`/users/${userId}`)
  }

  // const handleCancelClick = (e) => {
  //   e.preventDefault();s
  //   hideForm();
  // };

  return (
    <section className="editContainer">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Edit Question here..."
            value={title}
            onChange={updateTitle} />
          {/* <input
            type="text"
            placeholder=""
            value={description}
            onChange={updateDescription}/>  */}
          <button class="edit-btn" hidden={hideEdit} type="submit">Submit Edit</button>
      
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </div>
      <div>
        <form onSubmit={handleDelete}>
          <button class="del-btn" hidden={hideDelete} type="submit">Delete Question</button>
        </form>
      </div>
    </section>
  );
};

export default EditQuestionForm;