import { handleActions } from 'redux-actions'
import { movieActions as actions } from '../../actions'
import { PURGE } from 'redux-persist'

export const name = 'Movie'

const initialState = {
    dataMovie: [], // data fetch từ api
};

export default handleActions(
    {
        [actions.fetchMovieSuccess]: (state, action) => {
            console.log('fetchMovieSuccess: ', action.payload)
            const { dataMovie } = action.payload    // data trả về từ api lưu vào [dataMovie]
            console.log('fetchMovieSuccess: ', dataMovie) // check log 
            return {
                // ...state, 
                dataMovie: [...dataMovie] // setState
            };
        },
        [actions.fetchMovieError]: (state, action) => {
            return {
                ...state
            };
        },
        [PURGE]: (state, action) => {
            return initialState;
        }
    },
    initialState
)