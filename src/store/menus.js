import typeToReducer from 'type-to-reducer'
import * as Api from './api'

const FETCH = 'FETCH_MENUS'

function transform(menus) {
    return menus
}

const STATE = {
    isPending: false,
    error: null,
    data: [],
}

export default typeToReducer(
    {
        [FETCH]: {
            PENDING() {
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
                    data: transform(payload),
                }
            },
        },
    },
    STATE
)

export function fetch() {
    return (dispatch, getState) => {
        const { menus } = getState()

        if (menus === STATE) {
            return dispatch({
                type: FETCH,
                payload: Api.menus(),
            })
        }
    }
}
