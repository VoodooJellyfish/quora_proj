
import { useEffect } from "react";
import { useState } from "react";
import UserCommentList from "../UserComments/UserComments";
import UserQuestionList from "../UserQuestionList";

const UserProfile = () => {

const [hiddenQuestions, setQuestionsHidden] = useState(false)
const[hiddenAnswers, setAnswersHidden] = useState(false)

const hideQuestions= () => {
  setQuestionsHidden(true)
}
const hideAnswers= () => {
  setAnswersHidden(true)
}

  return(
    
    <div>
      <button onClick={hideQuestions}>Your Questions</button>
      <button onClick={hideAnswers}>Your Answers</button>
      <UserQuestionList hidden={hiddenQuestions}/>
      <UserCommentList hidden={hiddenAnswers}/>
    </div>
  )
}

export default UserProfile