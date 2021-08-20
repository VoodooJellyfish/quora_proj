import { csrfFetch } from "./csrf";

const GET_ANSWERS = 'questions/getAnswers';
const ADD_ONE = 'questions/addAnswer'
const DELETE_ANSWER = 'questions/deleteAnswer'

// Define Action Creators
const getAnswers = (answers) => ({
  type: GET_ANSWERS,
  answers,
});

const addOneAnswer = (answer) => ({
  type: ADD_ONE,
  answer,
});

const deleteAnswer = (answer) => ({
  type: DELETE_ANSWER,
  answer
})

export const fetchAnswers = (questionId) => async (dispatch) => {
  const res = await csrfFetch(`/api/questions/${questionId}/answers`);
  const answers = await res.json();
  dispatch(getAnswers(answers));
};

export const thunk_fetchUserAnswers = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/answers`)
  const answers = await res.json();
  dispatch(getAnswers(answers))
}

export const thunk_fetchAnswer = (answerId) => async (dispatch) => {
  const res = await csrfFetch(`/api/answers/${answerId}`);
  if(res.ok) {
    const answer = await res.json();
    dispatch(addOneAnswer(answer));
  }
};

export const thunk_createAnswer = (payload) => async (dispatch) => {
  const userId = payload.userId
  const questionId = payload.questionId
  const res = await csrfFetch(`/api/users/${userId}/questions/${questionId}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const newAnswer= await res.json();

  if (res.ok) {
    dispatch(addOneAnswer(newAnswer));
  }
  return newAnswer;
};

export const thunk_editAnswer = (payload) => async (dispatch) => {
  console.log("QQQQQQQ", payload)
  const res = await csrfFetch(`/api/answers/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  console.log(res.body)
  const newAnswer = await res.json();

  if (res.ok) {
    dispatch(addOneAnswer(newAnswer));
  }
  return newAnswer;
};

export const thunk_deleteAnswer = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/answers/${payload.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const answerToDelete = await res.json()
  if(res.ok) {
    dispatch(deleteAnswer(answerToDelete))
  }
}



// Define an initial state
const initialState = {
  list: []
};

// Define a reducer
const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANSWERS:
      const newState = {...state};
      action.answers.forEach(answer => {
        newState[answer.id] = answer;
      });
      return newState;
    case ADD_ONE: {
      if (!state[action.answer?.id]) {
        const newState = {
          ...state,
          [action.answer?.id]: action.answer
        };
        const answerList = newState.list.map(id => newState[id]);
        answerList.push(action.answer);
        return newState;
      }
      return {
        ...state,
        [action.answer?.id]: {
          ...state[action.answer?.id],
          ...action.answer,
        }
      };
    }
    case DELETE_ANSWER: {
      return {
        list: [
          ...state.list?.filter(answer => answer !== action.answer)
        ]
      }
      
    }
    default:
      return state;
  }
};

export default answersReducer;