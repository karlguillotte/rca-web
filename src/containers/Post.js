import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import InnerHTML from '../components/InnerHTML'
import { FullPost } from '../components/Post'
import Page, { Header, Content } from '../components/Page'
import { fetchBySlug, getBySlug } from '../store/posts'

Post.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    post: PropTypes.object,
}

function Post({ isLoading, isLoaded, post = {} }) {
    return (
        <Page>
            <Header>
                <InnerHTML component="h2">
                    {post.title}
                </InnerHTML>
            </Header>
            <Content>
                <FullPost {...post} />
            </Content>
        </Page>
    )
}

export default compose(
    connect((state, { match }) => getBySlug(state, match.params.slug), {
        fetchBySlug,
    }),
    lifecycle({
        componentDidMount() {
            const { fetchBySlug, match } = this.props

            fetchBySlug(match.params.slug)
        },
    })
)(Post)
