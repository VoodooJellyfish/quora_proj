

import { useState } from "react";
import UserCommentList from "../UserComments/UserComments";
import UserQuestionList from "../UserQuestionList";
import "./UserProfile.css"

const UserProfile = () => {

const [hiddenQuestions, setQuestionsHidden] = useState(false)
const[hiddenAnswers, setAnswersHidden] = useState(false)

const hideQuestions= () => {
  setQuestionsHidden(!hiddenQuestions)
}
const hideAnswers= () => {
  setAnswersHidden(!hiddenAnswers)
}

  return(
    
    <div className="toggleContainer">
      <div className="toggleButtons">
        <button className="toggle" onClick={hideQuestions}>Your Questions</button>

        <button className="toggle" onClick={hideAnswers}>Your Answers</button>
      </div>
      <div className="ProfileContainer">
        {hiddenQuestions ? <div></div> : <UserQuestionList/>}
        {hiddenAnswers ? <div></div> : <UserCommentList/>}
      </div>
    </div>
  )
}

export default UserProfile