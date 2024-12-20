import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'

const DEFAULT_STATE = {
  user: {
    id: '',
    email: '',
    password: '',
  },
  loading: false,
}

const reducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case 'USER/FETCH/START':
      return { ...structuredClone(state), loading: true }
    case 'USER/FETCH/SUCCESS':
      return {
        ...structuredClone(state),
        loading: false,
        error: null,
        user: payload,
      }
    case 'USER/FETCH/ERROR':
      return { ...structuredClone(state), loading: false, error: payload }
    case 'USER/NONE':
      return DEFAULT_STATE
    default:
      return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
