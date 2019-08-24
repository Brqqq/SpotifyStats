import { createStore, combineReducers } from 'redux';
import reducer from "./redux/reducer";

declare const window: any;

export default function configureStore() {
    return createStore(
        combineReducers({ app: reducer }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}