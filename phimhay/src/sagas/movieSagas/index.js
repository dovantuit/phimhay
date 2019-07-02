import { call, put } from 'redux-saga/effects'
import takeFirst from '../takeFirst'
import * as movieApi from '../../api/movieApi'  //api lấy movies
import { movieActions as actions } from '../../actions'
import _ from 'lodash';

function* handleFetchMovieRequest(action) {
    try {
        const { next, callback } = action.payload   // bắt [next] từ view của LoginScreen
        const { Response } = yield call(movieApi.getMoviesCinema, next)
        console.log('response handleFetchMovieRequest', Response)
        const data = {
            'dataMovie': Response
        }
        console.log(data)
        yield put(actions.fetchMovieSuccess(data));
        yield callback && callback();
    }
    catch (error) {
        yield put(actions.fetchMovieError(error.message));
    }
}

function* fetchMovieRequest() {
    yield takeFirst(actions.fetchMovieRequest, handleFetchMovieRequest);
}

export default {
    fetchMovieRequest
}