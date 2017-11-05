import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export function configureStore(){
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export const store = configureStore()
