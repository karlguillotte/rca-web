import * as Api from './api'
import {
    getEntityBySlug,
    getEntities,
    createFetchActionCreator,
    createFetchBySlugActionCreator,
    typeToReducer,
} from './utils'

const FETCH_PAGES = 'FETCH_PAGES'

export default typeToReducer(FETCH_PAGES)

export const fetchBySlug = createFetchBySlugActionCreator(
    FETCH_PAGES,
    Api.pages,
    state => state.pages
)
export const fetch = createFetchActionCreator(
    FETCH_PAGES,
    Api.pages,
    state => state.pages
)

export function getBySlug(state, slug) {
    return getEntityBySlug(state.pages, slug, page => ({ page }))
}

export function get(state, params) {
    return getEntities(state.pages, params, pages => ({ pages }))
}
