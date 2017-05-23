import React from 'react'
import PropTypes from 'prop-types'
import './Sponsor.css'

Sponsor.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}

export default function Sponsor({ name, url, image }) {
    return (
        <a href={url} target="_blank" className="Sponsor">
            <img src={image} alt={name} />
        </a>
    )
}

SponsorSet.propTypes = {
    sponsors: PropTypes.arrayOf(Sponsor.propTypes).isRequired,
    title: PropTypes.string,
    size: PropTypes.oneOf(['SMALL', 'MEDIUM', 'LARGE']),
}

export function SponsorSet({ sponsors = [], title, size = SMALL }) {
    return (
        <section className="SponsorSet">
            {title && <h2 className="SponsorSet--Title">{title}</h2>}
            {sponsors.map(sponsor => (
                <Sponsor key={sponsor.name} {...sponsor} />
            ))}
        </section>
    )
}
