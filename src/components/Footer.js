import React from 'react'
import PropTypes from 'prop-types'
import './Footer.css'

Footer.propTypes = {
    children: PropTypes.node,
}

export default function Footer({ children }) {
    return (
        <footer className="Footer">
            <div className="Footer--Content">
                {children}
                <address>
                    <h2>Revelstoke Cycling Association</h2>
                    <p>
                        Box 2374, Revelstoke, BC V0E 2S0
                    </p>
                    <a href="mailto:revybiker@gmail.com">revybiker@gmail.com</a>
                    <a href="tel:250-837-5910">250-837-5910</a>
                </address>
            </div>
        </footer>
    )
}
