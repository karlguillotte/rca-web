import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import InnerHTML from '../components/InnerHTML'
import Mute from '../components/Mute'
import Base, { Header, Content } from '../components/Page'
import { connect } from 'react-redux'
import { fetchBySlug, getBySlug } from '../store/pages'

Page.propTypes = {
    page: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }),
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
}

export function Page({ page: { title, content } = {}, isLoading, isLoaded }) {
    return (
        <Base>
            <Header>
                <h1>{title}</h1>
            </Header>
            <Content>
                {isLoading && <Mute>Loading...</Mute>}
                <InnerHTML>
                    {content}
                </InnerHTML>
            </Content>
        </Base>
    )
}

function mapStateToProps(state, { match }) {
    return getBySlug(state, match.params.slug)
}

export default compose(
    connect(mapStateToProps, { fetchBySlug }),
    lifecycle({
        componentDidMount() {
            const { fetchBySlug, match } = this.props

            fetchBySlug(match.params.slug)
        },
        componentWillReceiveProps({ match, fetchBySlug }) {
            fetchBySlug(match.params.slug)
        },
    })
)(Page)
