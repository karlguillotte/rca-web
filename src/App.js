import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Home, Page, Search, Post, Navbar, Footer } from './containers'

export default function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/search" component={Search} />
                    <Route path="/:year/:month/:day/:slug" component={Post} />
                    <Route path="/:slug" component={Page} />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}
