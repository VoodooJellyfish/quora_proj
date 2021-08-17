import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_editQuestion } from '../../store/question';

const EditQuestionForm = ({question}) => {
  const user = useSelector(state => Object.values(state.session));
  let userId = user[0].id
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
      console.log("SUCCESS EDIT")
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
          placeholder="Name"
          value={description}
          onChange={updateDescription}/> 
        <button type="submit">Submit Edit</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default EditQuestionForm;