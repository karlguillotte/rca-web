import * as Api from './api'
import {
    getEntityBySlug,
    getEntities,
    createFetchActionCreator,
    createFetchBySlugActionCreator,
    typeToReducer,
} from './utils'

const FETCH_POSTS = 'FETCH_POSTS'

export default typeToReducer(FETCH_POSTS)

export const fetchBySlug = createFetchBySlugActionCreator(
    FETCH_POSTS,
    Api.posts,
    state => state.posts
)
export const fetch = createFetchActionCreator(
    FETCH_POSTS,
    Api.posts,
    state => state.posts
)

export function getBySlug(state, slug) {
    return getEntityBySlug(state.posts, slug, post => ({ post }))
}

export function get(state, params) {
    return getEntities(state.posts, params, posts => ({ posts }))
}
