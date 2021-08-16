const GET_QUESTIONS = 'questions/getQuestions';

// Define Action Creators
const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const fetchQuestions = () => async (dispatch) => {
  const res = await fetch('/api/questions');
  const questions = await res.json();
  dispatch(getQuestions(questions));
};

// Define an initial state
const initialState = {};

// Define a reducer
const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      const newState = { ...state };
      action.questions.forEach(question => {
        newState[question.id] = question;
      });
      return newState;
    default:
      return state;
  }
};

export default questionsReducer;