import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InnerHTML from '../components/InnerHTML'
import Time from '../components/Time'
import format from 'date-fns/format'
import './Post.css'

Post.propTypes = {
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    slug: PropTypes.string.isRequired,
}

export default function Post({ title, excerpt, date, slug }) {
    const to = `${format(date, 'YYYY/MM/DD')}/${slug}`

    return (
        <div className="Post">
            <Time className="Post--Date" value={date} />
            <h3 className="Post--Title">
                <Link to={to}>
                    <InnerHTML component="span">
                        {title}
                    </InnerHTML>
                </Link>
            </h3>
            <InnerHTML>
                {excerpt}
            </InnerHTML>
        </div>
    )
}

PostSet.propTypes = {
    posts: PropTypes.arrayOf(Post.propTypes).isRequired,
}

export function PostSet({ posts = [] }) {
    return (
        <div>
            {posts.map(post => <Post key={post.id} {...post} />)}
        </div>
    )
}

FullPost.propTypes = {
    ...Post.propTypes,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
}

export function FullPost({ title, content, date, slug, author = {} }) {
    return (
        <div className="Post">
            <Time className="Post--Date" value={date} />
            <h3 className="Post--Title">
                <InnerHTML component="span">
                    {title}
                </InnerHTML>
                <small>
                    {' '}by {author.name}
                </small>
            </h3>
            <InnerHTML>
                {content}
            </InnerHTML>
        </div>
    )
}
