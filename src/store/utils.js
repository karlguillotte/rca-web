import typeToReducerBase from 'type-to-reducer'

const STATE = {
    requests: new Map(),
    data: new Map(),
}

const REQUEST = {
    isPending: false,
    params: null,
    error: null,
    slugs: new Set(),
}

function getKey(params) {
    return JSON.stringify(params)
}

const REDUCER = {
    PENDING({ requests, ...rest }, { meta: { params } }) {
        requests.set(getKey(params), {
            ...REQUEST,
            params,
            isPending: true,
        })

        return {
            ...rest,
            requests: new Map(requests),
        }
    },
    REJECTED({ requests, ...rest }, { payload, meta: { params } }) {
        const key = getKey(params)

        requests.set(key, {
            ...requests.get(key),
            error: payload,
            isPending: false,
        })

        return {
            ...rest,
            requests: new Map(requests),
        }
    },
    FULFILLED({ requests, data, ...rest }, { payload, meta: { params } }) {
        const key = getKey(params)

        payload.forEach(entity => {
            data.set(entity.slug, entity)
        })

        requests.set(key, {
            ...requests.get(key),
            slugs: new Set(payload.map(entity => entity.slug)),
            isPending: false,
        })

        return {
            ...rest,
            data: new Map(data),
            requests: new Map(requests),
        }
    },
}

export function getEntityBySlug(slice, slug, entityCreator) {
    return getEntities(slice, { slug }, entities => entityCreator(entities[0]))
}

export function getEntities({ data, requests }, params, entitiesCreator) {
    const key = getKey(params)
    const { isPending, error, slugs } = requests.get(key) || REQUEST

    return {
        isLoading: isPending,
        isLoaded: !isPending && !error,
        isError: Boolean(error),
        ...entitiesCreator(Array.from(slugs).map(slug => data.get(slug))),
    }
}

function createActionCreator(params, type, fetch, getSlice) {
    return (dispatch, getState) => {
        const { requests } = getSlice(getState())
        const key = getKey(params)

        if (requests.has(key)) {
            return Promise.resolve()
        }

        return dispatch({
            type,
            payload: fetch(params),
            meta: { params },
        })
    }
}

export function createFetchActionCreator(type, fetch, getSlice) {
    return params => createActionCreator(params, type, fetch, getSlice)
}

export function createFetchBySlugActionCreator(type, fetch, getSlice) {
    return slug => createActionCreator({ slug }, type, fetch, getSlice)
}

export function typeToReducer(type) {
    return typeToReducerBase(
        {
            [type]: REDUCER,
        },
        STATE
    )
}
