import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

export const DATE = 'dddd, MMMM D, YYYY'
export const DATETIME = 'dddd, MMMM D, YYYY HH:mm'
export const TIME = 'HH:mm'

const FORMATS = new Map([
    ['TIME', TIME],
    ['DATETIME', DATETIME],
    ['DATE', DATE],
])

Time.propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    type: PropTypes.oneOf(['TIME', 'DATETIME', 'DATE']),
    children: PropTypes.node,
}

export default function Time({ children, value, type = 'DATE', ...rest }) {
    return (
        <time dateTime={format(value)} {...rest}>
            {children || format(value, FORMATS.get(type))}
        </time>
    )
}
