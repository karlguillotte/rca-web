import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import Page, { MainHeader, Content } from '../components/Page'
import { PostSet } from '../components/Post'
import Mute from '../components/Mute'
import { connect } from 'react-redux'
import { fetch as fetchPosts, get as getPosts } from '../store/posts'
import { fetch as fetchMetadata } from '../store/metadata'

Home.propTypes = {
    posts: PropTypes.array.isRequired,
}

function Home({ posts: { posts, isLoading }, name, description }) {
    return (
        <Page>
            <MainHeader name={name} description={description} />
            <Content>
                <h2>Posts</h2>
                {isLoading
                    ? <Mute>Loading recent posts...</Mute>
                    : <PostSet posts={posts} />}
            </Content>
        </Page>
    )
}

const PARAMS = {
    per_page: 10,
}

function mapStateToProps(state) {
    const { name, description } = state.metadata.data

    return {
        posts: getPosts(state, PARAMS),
        name,
        description,
    }
}

export default compose(
    connect(mapStateToProps, { fetchPosts, fetchMetadata }),
    lifecycle({
        componentDidMount() {
            this.props.fetchPosts(PARAMS)
            this.props.fetchMetadata()
        },
    })
)(Home)
