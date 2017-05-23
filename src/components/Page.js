import React from 'react'
import PropTypes from 'prop-types'
import Gallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { IMAGES } from '../constants'
import './Page.css'

Page.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Page({ children }) {
    return (
        <div className="Page">
            {children}
        </div>
    )
}

export function Content({ children }) {
    return (
        <div className="Page--Content">
            {children}
        </div>
    )
}

Header.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Header({ children }) {
    const index = Math.floor(Math.random() * IMAGES.length)
    const style = {
        backgroundImage: `url("${IMAGES[index]}")`,
    }

    return (
        <div className="Page--Header" style={style}>
            <div className="Page--Header--Content">
                {children}
            </div>
        </div>
    )
}

MainHeader.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export function MainHeader({
    name = 'Revelstoke Cycling Association',
    description,
}) {
    const items = IMAGES.map(image => ({ original: image }))

    return (
        <div className="Page-MainHeader">
            <Gallery
                items={items}
                autoPlay
                showBullets
                showFullscreenButton={false}
                showPlayButton={false}
                showThumbnails={false}
                showNav={false}
            />
            <h1>
                {name}
                <small>
                    {description}
                </small>
            </h1>
        </div>
    )
}

export function Section({ children }) {
    return (
        <section className="Page--Section">
            {children}
        </section>
    )
}
