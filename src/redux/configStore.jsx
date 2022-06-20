import {combineReducers, createStore} from 'redux';
import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import { UserLoginReducer } from './reducers/UserLoginReducer';
import { JiraProjectReducer } from './reducers/JiraProjectReducer';
import { JiraManagementReducer } from './reducers/JiraManagementReducer';
import { JiraDrawerReducer } from './reducers/JiraDrawerReducer';
import { JiraDrawerContentReducer } from './reducers/JiraDrawerContentReducer';


const sagaMiddleWare = createSagaMiddleware();

const rootReducer = combineReducers({
    //reducers
    UserLoginReducer,
    JiraProjectReducer,
    JiraManagementReducer,
    JiraDrawerReducer,
    JiraDrawerContentReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);
