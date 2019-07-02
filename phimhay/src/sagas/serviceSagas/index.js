import { flatten } from 'lodash/array'
import { values } from 'lodash/object'
import { fork, all } from 'redux-saga/effects'

////
//import sagas list here
import serviceSagas from './serviceSagas'
///

const sagaList = [
    ////
    //add sagas list here
    serviceSagas,
    ///
];

export default function* () {
    yield all(
        flatten(sagaList.map(sagas => values(sagas))).map(saga => fork(saga))
    );
}