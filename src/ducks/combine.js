import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import coinMarketCapReducer from './cmc.js';

const rootReducer = combineReducers({
    form: formReducer,
    cmc: coinMarketCapReducer
});

export default rootReducer;