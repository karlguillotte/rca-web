import parseDate from 'date-fns/parse'
import { root } from './config.json'
import query from 'query-string'

function createUrl(type, params) {
    return `${root}wp/v2/${type}?${query.stringify(params)}`
}

function json(response) {
    return response.json()
}

function transformMetadata({ name, description }) {
    return {
        name,
        description,
    }
}

function transformPages(pages) {
    return pages.map(transformPage)
}

function transformPage({ id, slug, title, content }) {
    return {
        id,
        slug,
        title: title.rendered,
        content: content.rendered,
    }
}

function transformAuthor({ name }) {
    return {
        name,
    }
}

function transformPost({
    id,
    slug,
    title,
    content,
    excerpt,
    author,
    date,
    _embedded,
}) {
    return {
        id,
        slug,
        title: title.rendered,
        content: content.rendered,
        excerpt: excerpt.rendered,
        date: parseDate(date),
        author: transformAuthor(
            _embedded.author.find(({ id }) => id === author)
        ),
    }
}

function transformPosts(posts) {
    return posts.map(transformPost)
}

export function metadata() {
    return fetch(root).then(json).then(transformMetadata)
}

export function pages(params = {}) {
    const url = createUrl('pages', { ...params, _embed: true })

    return fetch(url).then(json).then(transformPages)
}

export function posts(params = {}) {
    const url = createUrl('posts', { ...params, _embed: true })

    return fetch(url).then(json).then(transformPosts)
}

export function menus() {
    return fetch(`${root}wp-api-menus/v2/menus`)
        .then(json)
        .then(menus =>
            Promise.all(
                menus.map(menu => fetch(menu.meta.links.self).then(json))
            )
        )
}
