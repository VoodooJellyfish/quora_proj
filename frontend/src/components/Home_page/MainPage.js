import Navigation from '../Navigation/index.js';
import QuestionsContainer from '../../components/QuestionsContainer';
import UserQuestionList from '../UserQuestionList/UserQuestionList.js';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./mainPage.css"



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
      <h2>Welcome</h2>
      <button onClick={directToUserQuestions}>Your Contributions</button>
      <div className="questionList">
        <QuestionsContainer/>
      </div>
    </>
  );
};

export default MainPage;