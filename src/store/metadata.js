import typeToReducer from 'type-to-reducer'
import * as Api from './api'

const FETCH = 'FETCH_METADATA'
const STATE = {
    data: {},
    isPending: false,
    error: null,
}

export default typeToReducer(
    {
        [FETCH]: {
            PENDING(state, action) {
                return {
                    ...STATE,
                    isPending: true,
                }
            },
            REJECTED(state, { payload }) {
                return {
                    ...STATE,
                    error: payload,
                }
            },
            FULFILLED(state, { payload }) {
                return {
                    ...STATE,
                    data: payload,
                }
            },
        },
    },
    STATE
)

export function fetch() {
    return (dispatch, getState) => {
        return dispatch({
            type: FETCH,
            payload: Api.metadata(),
        })
    }
}
