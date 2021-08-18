

import { useState } from "react";
import UserCommentList from "../UserComments/UserComments";
import UserQuestionList from "../UserQuestionList";

const UserProfile = () => {

const [hidden, setHidden] = useState(false)

const hideList = () => {
  setHidden(true)
  console.log("Hidden,", hidden)
}

  return(
    
    <div>
      <button onClick={hideList}>Your Questions</button>
      <button onClick={hideList}>Your Answers</button>
      <UserQuestionList hidden={hidden}/>
      <UserCommentList hidden={hidden}/>
    </div>
  )
}

export default UserProfile