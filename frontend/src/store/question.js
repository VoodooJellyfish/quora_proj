
import { csrfFetch } from "./csrf";

const GET_QUESTIONS = 'questions/getQuestions';
const ADD_ONE = 'questions/addQuestion'

// Define Action Creators
const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

const addOneQuestion = (question) => ({
  type: ADD_ONE,
  question,
});

export const fetchQuestions = () => async (dispatch) => {
  const res = await fetch('/api/questions');
  const questions = await res.json();
  dispatch(getQuestions(questions));
};

export const thunk_fetchUserQuestions = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`)
  const questions = await res.json();
  dispatch(getQuestions(questions))
}

export const thunk_fetchQuestion = (questionId) => async (dispatch) => {
  const res = await fetch(`/api/questions/${questionId}`);
  if(res.ok) {
    const question = await res.json();
    dispatch(addOneQuestion(question));
  }
};

export const thunk_createQuestion = (payload) => async (dispatch) => {
  const userId = payload.ownerId
  const res = await csrfFetch(`/api/users/${userId}/question`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const newQuestion = await res.json();

  if (res.ok) {
    dispatch(addOneQuestion(newQuestion));
  }
  return newQuestion;
};

export const thunk_editQuestion = (payload) => async (dispatch) => {
  console.log("QQQQQQQ", payload)
  const res = await fetch(`/api/questions/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  console.log(res.body)
  const newQuestion = await res.json();

  if (res.ok) {
    dispatch(addOneQuestion(newQuestion));
  }
  return newQuestion;
};



// Define an initial state
const initialState = {
  list: []
};

// Define a reducer
const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      const newState = { ...state };
      action.questions.forEach(question => {
        newState[question.id] = question;
      });
      return newState;
    case ADD_ONE: {
      if (!state[action.question?.id]) {
        const newState = {
          ...state,
          [action.question?.id]: action.question
        };
        const questionList = newState.list.map(id => newState[id]);
        questionList.push(action.question);
        return newState;
      }
      return {
        ...state,
        [action.question?.id]: {
          ...state[action.question?.id],
          ...action.question,
        }
      };
    }
    default:
      return state;
  }
};

export default questionsReducer;