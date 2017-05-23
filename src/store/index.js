import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import posts from './posts'
import pages from './pages'
import authors from './authors'
import sponsors from './sponsors'
import menus from './menus'
import metadata from './metadata'

export default createStore(
    combineReducers({
        posts,
        pages,
        authors,
        sponsors,
        menus,
        metadata,
    }),
    applyMiddleware(thunk, promise())
)
