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
    <div className="home">
      <div><h1>Welcome</h1></div>
      <div><button className='btn' onClick={directToUserQuestions}>Go to your profile</button></div>
      <div className="questionList">
        <QuestionsContainer/>
      </div>
    </div>
  );
};

export default MainPage;