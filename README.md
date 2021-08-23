# quora_proj

# Imposter Quora

Imposter Quora is a website allowing you ask and answer various questions. HorrorHost can be found at: https://imposter-quora.herokuapp.com/

## Development
* You can read more about the project using the wiki located at: https://github.com/Voodoojellyfish/quora-proj/wiki
* To start a development environment:
    1. Clone the repository at: https://github.com/VoodooJellyfish/quora_prof
    2. Run the command "npm install" from the backend directory in your terminal to install dependencies for the backend.
    3. Run the command "npm install" from the frontend directory in your terminal to install dependencies for the frontend.
    4. Run the command "npm start" from the backend directory to start the backend server.
    5. Run the command "npm start" from the frontend directory to start the frontend server.
    6. Navigate to the localhost port specified in config/index.js

## Technologies Used
* Javascript
* HTML/CSS
* Reactjs
* Node.js
* Express
* Postgres
* Sequelize
* Heroku
* Git/Github
* Redux

##  Features
* Users
    * User functionality including registration, Login/Logout authentication, and authorization to perform different CRUD operations throughout the site is all present.
    * The Bcrypt hashing algorithm is used to maintain password security.
    * All forms are protected against Csurf attacks
* Questions
    * Authenticated users can submit new questions for other users to answer.
    * Authenticated users can edit questions that are already submited, as well as delete their questions.
    * Any user can view previously submitted questions and answers to those questions.
* Answers
    * Authenticated users can submit new answers for other user's questions.
    * Authenticated users can edit the answers they created, as well as delete their answers.
    * Any user can view previously submitted questions and answers to those questions.

## Challenges and Learnings
* I learned quickly how important it is to ensure that I protect my main branch, and commit early and often to keep all the branches updated.
* I had a lot of reload/refresh errors that were caused by react being too fast, and rendering components without having the data loaded. The "?" operator was very important.
* Implementing a toggle between answers and questions to render different conditions was difficult, but I now know how to conditionally render components.
* I left the majority of the css and styling work until after I got all my logic implemented, and this was a mistake, as I could not style as much as I wanted to.

## Code Highlights
* Conditionally render a link to the answers a user has previously submitted, and the question that they are answering in react*
* Notice all of the "?" operators
```
const AnswersList = ({question}) => {
  // Declare variables from hooks
  const dispatch = useDispatch();
  let answers = useSelector(state => Object.values(state.answer));
  let questionAnswers = answers?.filter(answer => +answer?.questionId === +question?.id)
  

  // Use a 'react' hook and cause a side effect
  useEffect(() => {
    if(question) {
      dispatch(fetchAnswers(question?.id));
    }
    
  }, [question, dispatch]);

  return (
    <div id="main-content">
      <ul className="questionul">
          {questionAnswers?.map((answer) => 
          <li key={answer?.id} className="listItem">
            <div>{answer.User ? answer.User.username : []}</div>
            <div className="question-square">
              <NavLink className="question" key={answer?.id} to={`/answers/${answer.id}`}>{answer?.answer}</NavLink>
            </div>
            <div>{answer?.createdAt}</div>
          </li>)}
      </ul>
      {/* <Route path="/questions/:questionId">
          <QuestionDetails/>
      </Route> */}
    </div>
  );
};
```
## Database Structure
![](https://github.com/jdrichardsappacad/mod-5-extra-resources/blob/main/assets/dbschemas/quora.jpg)

## Contributors
* [Tanner Pedretti](https://github.com/VoodooJellyfish) (VoodooJellyfish)
