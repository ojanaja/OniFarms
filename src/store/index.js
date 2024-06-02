import { createStore, combineReducers, applyMiddleware } from 'redux';
import alarmReducer from '../reducers/alarmReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    alarms: alarmReducer,
});

const configureStore = () => {
    return createStore(
        rootReducer,
        applyMiddleware(thunk));
}

export default configureStore;
