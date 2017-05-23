import React from 'react'
import PropTypes from 'prop-types'
import './Mute.css'

Mute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Mute({ children }) {
    return (
        <div className="Mute">
            {children}
        </div>
    )
}
