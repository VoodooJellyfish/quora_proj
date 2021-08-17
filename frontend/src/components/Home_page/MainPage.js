import Navigation from '../Navigation/index.js';
import QuestionsContainer from '../../components/QuestionsContainer';
import UserQuestionList from '../UserProfile/UserProfile.js';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';



const MainPage = () => {

  const history = useHistory()

  const user = useSelector(state => Object.values(state.session));
  const userId = user[0]?.id

  // console.log("THIS IS THE USER ID", user)

  const directToUserQuestions = () => {
  let path = `/users/${userId}`
  history.push(path)
  }


  return (
    <>
      <h2>List of Questions</h2>
      <button onClick={directToUserQuestions}>Your Questions</button>
      <QuestionsContainer/>
    </>
  );
};

export default MainPage;