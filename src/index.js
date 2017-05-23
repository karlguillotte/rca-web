import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './store'

import 'normalize.css'
import './index.css'
import './wordpress.css'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
