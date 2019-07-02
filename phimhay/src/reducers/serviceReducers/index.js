import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer as fromReducer } from 'redux-form'

////
//import reduders here
import serviceReducers, { name as nameOfServiceReducers } from './serviceReducers'
////



const rootPersisConfig = {
    key: 'root',
    storage: storage,
    debug: true,
    timeout: null,
    blacklist: [nameOfLoadingReducers]
};

const reducers = {
    [nameOfServiceReducers]: serviceReducers,
}

////search here Object.assign(reducers,{form: fromReducer})
const rootReducer = combineReducers(
    Object.assign(reducers, {
        form: fromReducer
    })
);

export default persistReducer(rootPersisConfig, rootReducer);

export {
    nameOfServiceReducers,
}