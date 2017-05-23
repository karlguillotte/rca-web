import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Page, { Content, Header, Section } from '../components/Page'
import { PostSet } from '../components/Post'
import Form from '../components/Search'
import Mute from '../components/Mute'
import { fetch as fetchPosts, get as getPosts } from '../store/posts'
import { fetch as fetchPages, get as getPages } from '../store/pages'
import query from 'query-string'

class Search extends Component {
    static propTypes = {
        posts: PropTypes.shape({
            posts: PropTypes.array.isRequired,
            isLoading: PropTypes.bool.isRequired,
            isLoaded: PropTypes.bool.isRequired,
        }),
        pages: PropTypes.shape({
            pages: PropTypes.array.isRequired,
            isLoading: PropTypes.bool.isRequired,
            isLoaded: PropTypes.bool.isRequired,
        }),
    }
    get q() {
        return query.parse(this.props.location.search).q
    }
    get params() {
        return {
            search: this.q,
        }
    }
    search() {
        this.props.fetchPosts(this.params)
        this.props.fetchPages(this.params)
    }
    componentDidMount() {
        this.search()
    }
    componentDidUpdate() {
        this.search()
    }
    handleSubmit = value => {
        this.props.history.push({
            pathname: '/search',
            search: `?q=${value}`,
        })
    }
    render() {
        const { q } = this
        const { posts, pages } = this.props

        return (
            <Page>
                <Header>
                    <h1>Search</h1>
                </Header>
                <Content>
                    <Form onSubmit={this.handleSubmit} value={q} />
                    {q &&
                        <Section>
                            <h2>Posts</h2>
                            {posts.isLoading && <Mute>Loading posts...</Mute>}
                            {posts.isLoaded && <PostSet posts={posts.posts} />}
                            {posts.isLoaded &&
                                posts.posts.length === 0 &&
                                <Mute>No post matches "{q}".</Mute>}
                        </Section>}
                    {q &&
                        <Section>
                            <h2>Pages</h2>
                            {pages.isLoading && <Mute>Loading pages...</Mute>}
                            {pages.isLoaded &&
                                pages.pages.length === 0 &&
                                <Mute>No page matches "{q}".</Mute>}
                        </Section>}
                </Content>
            </Page>
        )
    }
}

function mapStateToProps(state, { location }) {
    const { q } = query.parse(location.search)
    const params = { search: q }

    return {
        posts: getPosts(state, params) || {},
        pages: getPages(state, params) || {},
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        fetchPosts,
        fetchPages,
    })
)(Search)
